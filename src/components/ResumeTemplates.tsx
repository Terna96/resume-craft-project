import { ResumeData } from '@/types/resume';
import { format } from 'date-fns';
import { Mail, Phone, MapPin } from 'lucide-react';

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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b border-blue-200 pb-1">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b border-blue-200 pb-1">
            Work Experience
          </h2>
          {data.workExperience.map((work) => (
            <div key={work.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-lg">{work.position}</h3>
                <span className="text-sm text-gray-600">
                  {formatDate(work.startDate)} - {work.current ? 'Present' : formatDate(work.endDate)}
                </span>
              </div>
              <p className="text-blue-600 font-medium mb-2">{work.company}</p>
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
          <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b border-blue-200 pb-1">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold">{edu.degree} in {edu.fieldOfStudy}</h3>
                <span className="text-sm text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              <p className="text-blue-600">{edu.institution}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b border-blue-200 pb-1">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {Array.from(new Set(data.skills.map(skill => skill.category))).map(category => (
              <div key={category}>
                <h3 className="font-medium text-sm mb-2 text-gray-800">{category}</h3>
                <div className="space-y-1">
                  {data.skills
                    .filter(skill => skill.category === category)
                    .map(skill => (
                      <div key={skill.id} className="flex justify-between items-center">
                        <span className="text-sm">{skill.name}</span>
                        <span className="text-xs text-blue-600 font-medium">{skill.level}</span>
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
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
        <h1 className="text-5xl font-light text-gray-800 mb-4">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center gap-6 text-sm text-gray-600">
          {data.personalInfo.email && (
            <span>{data.personalInfo.email}</span>
          )}
          {data.personalInfo.phone && (
            <span>{data.personalInfo.phone}</span>
          )}
          {data.personalInfo.address && (
            <span>{data.personalInfo.address}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wider">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wider">
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
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wider">
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
          <h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wider">
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
                      <div key={skill.id} className="flex justify-between items-center">
                        <span className="text-sm">{skill.name}</span>
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