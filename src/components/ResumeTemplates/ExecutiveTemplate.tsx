import { ResumeData } from '@/types/resume';
import { format } from 'date-fns';
import { Mail, Phone, MapPin, Award } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ResumeTemplateProps {
  data: ResumeData;
}

export function ExecutiveTemplate({ data }: ResumeTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white text-black p-0 min-h-[842px] w-[595px] mx-auto shadow-lg">
      {/* Header with dark background */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-8">
        <div className="flex items-center gap-6">
          {data.personalInfo.profilePicture && (
            <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
              <AvatarImage src={data.personalInfo.profilePicture} alt="Profile" />
              <AvatarFallback className="text-red-800 text-3xl font-bold">
                {data.personalInfo.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3 tracking-wide">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="grid grid-cols-1 gap-2 text-sm opacity-95">
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
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{data.personalInfo.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Executive Summary */}
        {data.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-red-800 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Executive Summary
            </h2>
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
              <p className="text-sm leading-relaxed text-gray-700 font-medium">
                {data.personalInfo.summary}
              </p>
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {data.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-red-800 mb-4 pb-2 border-b-2 border-red-200">
              Executive Experience
            </h2>
            {data.workExperience.map((work) => (
              <div key={work.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{work.position}</h3>
                    <p className="text-red-700 font-semibold text-base">{work.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-white bg-red-600 px-3 py-1 rounded font-medium">
                      {formatDate(work.startDate)} - {work.current ? 'Present' : formatDate(work.endDate)}
                    </span>
                  </div>
                </div>
                {work.description && (
                  <div className="mt-3 pl-4 border-l-4 border-red-300">
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
            <h2 className="text-xl font-bold text-red-800 mb-4 pb-2 border-b-2 border-red-200">
              Education & Credentials
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-4 flex justify-between items-center bg-red-50 p-3 rounded-lg">
                <div>
                  <h3 className="font-bold text-gray-800">{edu.degree} in {edu.fieldOfStudy}</h3>
                  <p className="text-red-700 font-semibold">{edu.institution}</p>
                </div>
                <span className="text-sm text-red-600 font-medium">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Core Competencies */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-red-800 mb-4 pb-2 border-b-2 border-red-200">
              Executive Competencies
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Array.from(new Set(data.skills.map(skill => skill.category))).map(category => (
                <div key={category} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-red-800 mb-3 uppercase tracking-wide text-sm">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {data.skills
                      .filter(skill => skill.category === category)
                      .map(skill => (
                        <div key={skill.id} className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                          <span className="text-xs text-white bg-red-600 px-2 py-1 rounded font-medium">
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
    </div>
  );
}