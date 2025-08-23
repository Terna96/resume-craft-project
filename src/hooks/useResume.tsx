import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ResumeData, PersonalInfo, Education, WorkExperience, Skill } from '@/types/resume';
import { toast } from '@/hooks/use-toast';

const getDefaultResumeData = (): ResumeData => ({
  title: 'My Resume',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
  },
  education: [],
  workExperience: [],
  skills: [],
  templateId: 'modern',
});

export function useResume() {
  const [resumeData, setResumeData] = useState<ResumeData>(getDefaultResumeData());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  // Load resume data when user is available
  useEffect(() => {
    if (user) {
      loadResumeData();
    }
  }, [user]);

  const loadResumeData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setResumeData({
          id: data.id,
          title: data.title,
          personalInfo: data.personal_info as unknown as PersonalInfo,
          education: data.education as unknown as Education[],
          workExperience: data.work_experience as unknown as WorkExperience[],
          skills: data.skills as unknown as Skill[],
          templateId: data.template_id as 'modern' | 'professional',
        });
      }
    } catch (error: any) {
      console.error('Error loading resume:', error);
      toast({
        title: "Error loading resume",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveResumeData = async (data: ResumeData) => {
    if (!user) return;

    setSaving(true);
    try {
      const resumePayload = {
        user_id: user.id,
        title: data.title,
        personal_info: data.personalInfo as any,
        education: data.education as any,
        work_experience: data.workExperience as any,
        skills: data.skills as any,
        template_id: data.templateId,
      };

      if (data.id) {
        // Update existing resume
        const { error } = await supabase
          .from('resumes')
          .update(resumePayload)
          .eq('id', data.id);

        if (error) throw error;
      } else {
        // Create new resume
        const { data: newResume, error } = await supabase
          .from('resumes')
          .insert(resumePayload)
          .select()
          .single();

        if (error) throw error;
        
        setResumeData(prev => ({
          ...prev,
          id: newResume.id,
        }));
      }

      toast({
        title: "Resume saved",
        description: "Your resume has been saved successfully.",
      });
    } catch (error: any) {
      console.error('Error saving resume:', error);
      toast({
        title: "Error saving resume",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return {
    resumeData,
    setResumeData,
    saveResumeData,
    loading,
    saving,
  };
}