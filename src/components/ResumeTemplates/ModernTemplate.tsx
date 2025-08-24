import { ResumeData } from '@/types/resume';
import { format } from 'date-fns';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ResumeTemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: ResumeTemplateProps) {
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
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 -mx-8 -mt-8 mb-8 rounded-b-3xl">
        <div className="flex items-center gap-6">
          {data.personalInfo.profilePicture && (
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={data.personalInfo.profilePicture} alt="Profile" />
              <AvatarFallback className="text-blue-600 text-2xl font-bold">
                {data.personalInfo.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm opacity-95">
              {data.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.address && (
                <div className="flex items-center gap-2 md:col-span-2">
                  <MapPin className="w-4 h-4" />
                  <span>{data.personalInfo.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              {data.personalInfo.summary}
            </p>
          </div>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-200">
            Work Experience
          </h2>
          {data.workExperience.map((work) => (
            <div key={work.id} className="mb-4 pl-4 border-l-2 border-blue-200">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-lg text-gray-800">{work.position}</h3>
                <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                  {formatDate(work.startDate)} - {work.current ? 'Present' : formatDate(work.endDate)}
                </span>
              </div>
              <p className="text-blue-700 font-semibold mb-2">{work.company}</p>
              {work.description && (
                <p className="text-sm text-gray-700 leading-relaxed">
                  {work.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-200">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3 bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-800">{edu.degree} in {edu.fieldOfStudy}</h3>
                <span className="text-sm text-blue-600 font-medium">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              <p className="text-blue-700 font-medium">{edu.institution}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-200">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {Array.from(new Set(data.skills.map(skill => skill.category))).map(category => (
              <div key={category} className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold text-sm mb-2 text-blue-800 uppercase tracking-wide">
                  {category}
                </h3>
                <div className="space-y-1">
                  {data.skills
                    .filter(skill => skill.category === category)
                    .map(skill => (
                      <div key={skill.id} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{skill.name}</span>
                        <span className="text-xs text-blue-600 font-medium bg-white px-2 py-1 rounded">
                          {skill.level}
                        </span>
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