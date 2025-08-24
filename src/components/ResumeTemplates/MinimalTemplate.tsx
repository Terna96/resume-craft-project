import { ResumeData } from '@/types/resume';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ResumeTemplateProps {
  data: ResumeData;
}

export function MinimalTemplate({ data }: ResumeTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white text-black p-12 min-h-[842px] w-[595px] mx-auto shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-8 mb-12 pb-8 border-b border-gray-200">
        {data.personalInfo.profilePicture && (
          <Avatar className="h-24 w-24 border border-gray-300">
            <AvatarImage src={data.personalInfo.profilePicture} alt="Profile" />
            <AvatarFallback className="text-gray-600 text-2xl font-light">
              {data.personalInfo.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
        <div>
          <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-tight">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="space-y-1 text-sm text-gray-600">
            {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
            {data.personalInfo.address && <p>{data.personalInfo.address}</p>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-10">
          <p className="text-base leading-relaxed text-gray-700 font-light">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-medium text-gray-900 uppercase tracking-widest mb-6">
            Experience
          </h2>
          {data.workExperience.map((work) => (
            <div key={work.id} className="mb-8">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-medium text-gray-900">{work.position}</h3>
                <span className="text-sm text-gray-500 font-light">
                  {formatDate(work.startDate)} — {work.current ? 'Present' : formatDate(work.endDate)}
                </span>
              </div>
              <p className="text-base text-gray-700 mb-3 font-light">{work.company}</p>
              {work.description && (
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  {work.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-medium text-gray-900 uppercase tracking-widest mb-6">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-medium text-gray-900">
                  {edu.degree} in {edu.fieldOfStudy}
                </h3>
                <span className="text-sm text-gray-500 font-light">
                  {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                </span>
              </div>
              <p className="text-base text-gray-700 font-light">{edu.institution}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-medium text-gray-900 uppercase tracking-widest mb-6">
            Skills
          </h2>
          <div className="space-y-6">
            {Array.from(new Set(data.skills.map(skill => skill.category))).map(category => (
              <div key={category}>
                <h3 className="text-sm font-medium text-gray-800 mb-3 uppercase tracking-wide">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {data.skills
                    .filter(skill => skill.category === category)
                    .map(skill => (
                      <div key={skill.id} className="flex items-center">
                        <span className="text-sm text-gray-700 mr-2">{skill.name}</span>
                        <span className="text-xs text-gray-500 font-light">({skill.level})</span>
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