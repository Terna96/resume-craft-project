import { ResumeData } from '@/types/resume';
import { format } from 'date-fns';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ResumeTemplateProps {
  data: ResumeData;
}

export function ProfessionalTemplate({ data }: ResumeTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white text-black p-8 min-h-[842px] w-[595px] mx-auto shadow-lg">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-4 border-gray-800">
        {data.personalInfo.profilePicture && (
          <Avatar className="h-28 w-28 mx-auto mb-4 border-4 border-gray-300">
            <AvatarImage src={data.personalInfo.profilePicture} alt="Profile" />
            <AvatarFallback className="text-gray-600 text-3xl font-bold">
              {data.personalInfo.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
        <h1 className="text-5xl font-light text-gray-800 mb-4 tracking-wide">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center gap-8 text-sm text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{data.personalInfo.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wider border-b border-gray-300 pb-2">
            Executive Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 italic">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
            Professional Experience
          </h2>
          {data.workExperience.map((work) => (
            <div key={work.id} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-semibold text-gray-800">{work.position}</h3>
                <span className="text-sm text-gray-600 font-medium">
                  {formatDate(work.startDate)} - {work.current ? 'Present' : formatDate(work.endDate)}
                </span>
              </div>
              <p className="text-gray-600 font-medium mb-3 italic">{work.company}</p>
              {work.description && (
                <div className="bg-gray-50 p-3 rounded border-l-4 border-gray-400">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {work.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold text-gray-800">{edu.degree} in {edu.fieldOfStudy}</h3>
                <span className="text-sm text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              <p className="text-gray-600 italic">{edu.institution}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {Array.from(new Set(data.skills.map(skill => skill.category))).map(category => (
              <div key={category}>
                <h3 className="font-semibold text-sm mb-3 text-gray-800 uppercase tracking-wide">
                  {category}
                </h3>
                <div className="space-y-2">
                  {data.skills
                    .filter(skill => skill.category === category)
                    .map(skill => (
                      <div key={skill.id} className="flex justify-between items-center border-b border-gray-200 pb-1">
                        <span className="text-sm text-gray-700">{skill.name}</span>
                        <span className="text-xs text-gray-600 font-medium">{skill.level}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}