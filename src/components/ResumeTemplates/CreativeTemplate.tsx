import { ResumeData } from '@/types/resume';
import { format } from 'date-fns';
import { Mail, Phone, MapPin, Palette } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ResumeTemplateProps {
  data: ResumeData;
}

export function CreativeTemplate({ data }: ResumeTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white text-black p-0 min-h-[842px] w-[595px] mx-auto shadow-lg overflow-hidden">
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-purple-600 via-purple-700 to-pink-600 text-white p-6">
          {/* Profile Picture */}
          {data.personalInfo.profilePicture && (
            <div className="text-center mb-6">
              <Avatar className="h-32 w-32 mx-auto border-4 border-white shadow-lg">
                <AvatarImage src={data.personalInfo.profilePicture} alt="Profile" />
                <AvatarFallback className="text-purple-600 text-3xl font-bold">
                  {data.personalInfo.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          )}

          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                <Mail className="w-4 h-4" />
              </div>
              Contact
            </h3>
            <div className="space-y-2 text-sm">
              {data.personalInfo.email && (
                <p className="break-words">{data.personalInfo.email}</p>
              )}
              {data.personalInfo.phone && (
                <p>{data.personalInfo.phone}</p>
              )}
              {data.personalInfo.address && (
                <p className="text-xs">{data.personalInfo.address}</p>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                  <Palette className="w-4 h-4" />
                </div>
                Skills
              </h3>
              <div className="space-y-3">
                {Array.from(new Set(data.skills.map(skill => skill.category))).map(category => (
                  <div key={category}>
                    <h4 className="font-semibold text-sm mb-2 text-pink-200">{category}</h4>
                    <div className="space-y-1">
                      {data.skills
                        .filter(skill => skill.category === category)
                        .map(skill => (
                          <div key={skill.id} className="text-xs">
                            <div className="flex justify-between mb-1">
                              <span>{skill.name}</span>
                              <span className="text-pink-200">{skill.level}</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-1">
                              <div 
                                className="bg-pink-300 h-1 rounded-full"
                                style={{
                                  width: skill.level === 'Expert' ? '100%' : 
                                         skill.level === 'Advanced' ? '80%' :
                                         skill.level === 'Intermediate' ? '60%' : '40%'
                                }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4"></div>
          </div>

          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-700 mb-3">
                About Me
              </h2>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <p className="text-sm leading-relaxed text-gray-700">
                  {data.personalInfo.summary}
                </p>
              </div>
            </div>
          )}

          {/* Work Experience */}
          {data.workExperience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-700 mb-4">
                Experience
              </h2>
              {data.workExperience.map((work, index) => (
                <div key={work.id} className="mb-4 relative">
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-800">{work.position}</h3>
                        <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                          {formatDate(work.startDate)} - {work.current ? 'Present' : formatDate(work.endDate)}
                        </span>
                      </div>
                      <p className="text-purple-700 font-semibold mb-2">{work.company}</p>
                      {work.description && (
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {work.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {index < data.workExperience.length - 1 && (
                    <div className="w-px h-4 bg-gradient-to-b from-purple-400 to-pink-400 ml-2 mt-2"></div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-700 mb-4">
                Education
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <span className="text-xs text-purple-600 font-medium">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-purple-700 font-medium">{edu.institution}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}