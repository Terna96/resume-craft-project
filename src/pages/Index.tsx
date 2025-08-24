import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useResume } from '@/hooks/useResume';
import { ResumeForm } from '@/components/ResumeForm';
import { 
  ModernTemplate, 
  ProfessionalTemplate, 
  CreativeTemplate, 
  MinimalTemplate, 
  ExecutiveTemplate 
} from '@/components/ResumeTemplates';
import { PDFDownload } from '@/components/PDFDownload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LogOut, FileText, Palette, Save, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResumeData, TemplateId } from '@/types/resume';

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { resumeData, setResumeData, saveResumeData, loading, saving } = useResume();
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Auto-save functionality
  const handleDataChange = (newData: ResumeData) => {
    setResumeData(newData);
    
    // Clear existing timeout
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    
    // Set new timeout for auto-save
    const timeout = setTimeout(() => {
      saveResumeData(newData);
    }, 2000); // Auto-save after 2 seconds of inactivity
    
    setAutoSaveTimeout(timeout);
  };

  const handleManualSave = () => {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    saveResumeData(resumeData);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const renderTemplate = () => {
    switch (resumeData.templateId) {
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      case 'executive':
        return <ExecutiveTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-primary mr-3" />
              <h1 className="text-2xl font-bold text-foreground">Resume Builder</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.email}
              </span>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Resume Settings
                  <Button 
                    onClick={handleManualSave} 
                    disabled={saving}
                    size="sm"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </CardTitle>
                <CardDescription>
                  Customize your resume title and template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resume-title">Resume Title</Label>
                  <Input
                    id="resume-title"
                    value={resumeData.title}
                    onChange={(e) => handleDataChange({ ...resumeData, title: e.target.value })}
                    placeholder="My Professional Resume"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-select">Template</Label>
                  <Select
                    value={resumeData.templateId}
                    onValueChange={(value: TemplateId) => 
                      handleDataChange({ ...resumeData, templateId: value })
                    }
                  >
                    <SelectTrigger id="template-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">
                        <div className="flex items-center">
                          <Palette className="w-4 h-4 mr-2 text-blue-600" />
                          Modern Template
                        </div>
                      </SelectItem>
                      <SelectItem value="professional">
                        <div className="flex items-center">
                          <Palette className="w-4 h-4 mr-2 text-gray-600" />
                          Professional Template
                        </div>
                      </SelectItem>
                      <SelectItem value="creative">
                        <div className="flex items-center">
                          <Palette className="w-4 h-4 mr-2 text-purple-600" />
                          Creative Template
                        </div>
                      </SelectItem>
                      <SelectItem value="minimal">
                        <div className="flex items-center">
                          <Palette className="w-4 h-4 mr-2 text-slate-600" />
                          Minimal Template
                        </div>
                      </SelectItem>
                      <SelectItem value="executive">
                        <div className="flex items-center">
                          <Palette className="w-4 h-4 mr-2 text-red-600" />
                          Executive Template
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <ScrollArea className="h-[calc(100vh-300px)]">
              <ResumeForm 
                data={resumeData} 
                onChange={handleDataChange}
              />
            </ScrollArea>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Resume Preview
                  <PDFDownload 
                    data={resumeData} 
                    elementId="resume-preview"
                  />
                </CardTitle>
                <CardDescription>
                  Live preview of your resume
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 shadow-inner">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div 
                      id="resume-preview" 
                      className="transform scale-[0.7] origin-top-left overflow-hidden"
                      style={{ 
                        height: '842px',
                        width: '595px'
                      }}
                    >
                      {renderTemplate()}
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-xs text-muted-foreground">Live Preview • Updates in real-time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
