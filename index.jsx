import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Download, Eye, User, Briefcase, GraduationCap, Award, Mail, Phone, MapPin, Globe, Plus, Trash2, Edit3 } from 'lucide-react';

const RunMeCVAI = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cvData, setCvData] = useState({
    personal: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: []
  });

  const steps = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award }
  ];

  const handleAIEnhancement = (field, currentText) => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let enhancedText = '';
      
      if (field === 'summary') {
        enhancedText = `Dynamic ${cvData.personal.title || 'professional'} with proven expertise in driving results through innovative solutions. Demonstrates exceptional leadership capabilities and strategic thinking, consistently delivering value in fast-paced environments while maintaining focus on sustainable growth and team development.`;
      } else if (field === 'jobDescription') {
        enhancedText = `• Led cross-functional initiatives that improved operational efficiency by 35% through strategic process optimization
• Collaborated with diverse stakeholders to deliver high-impact projects, consistently exceeding performance targets
• Mentored junior team members and fostered a culture of continuous learning and professional development`;
      }
      
      if (field === 'summary') {
        setCvData(prev => ({ ...prev, summary: enhancedText }));
      }
      
      setIsGenerating(false);
    }, 2000);
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        company: '',
        position: '',
        duration: '',
        description: ''
      }]
    }));
  };

  const updateExperience = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        institution: '',
        degree: '',
        duration: '',
        details: ''
      }]
    }));
  };

  const updateEducation = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addSkill = (skill) => {
    if (skill && !cvData.skills.includes(skill)) {
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const PersonalInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-light text-gray-900 mb-2">Let's start with the basics</h2>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            placeholder="John Doe"
            value={cvData.personal.name}
            onChange={(e) => setCvData(prev => ({
              ...prev,
              personal: { ...prev.personal, name: e.target.value }
            }))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            placeholder="Senior Product Manager"
            value={cvData.personal.title}
            onChange={(e) => setCvData(prev => ({
              ...prev,
              personal: { ...prev.personal, title: e.target.value }
            }))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            placeholder="john@example.com"
            value={cvData.personal.email}
            onChange={(e) => setCvData(prev => ({
              ...prev,
              personal: { ...prev.personal, email: e.target.value }
            }))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            placeholder="+1 (555) 123-4567"
            value={cvData.personal.phone}
            onChange={(e) => setCvData(prev => ({
              ...prev,
              personal: { ...prev.personal, phone: e.target.value }
            }))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            placeholder="New York, NY"
            value={cvData.personal.location}
            onChange={(e) => setCvData(prev => ({
              ...prev,
              personal: { ...prev.personal, location: e.target.value }
            }))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website/Portfolio</label>
          <input
            type="url"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            placeholder="www.johndoe.com"
            value={cvData.personal.website}
            onChange={(e) => setCvData(prev => ({
              ...prev,
              personal: { ...prev.personal, website: e.target.value }
            }))}
          />
        </div>
      </div>
      
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
        <div className="relative">
          <textarea
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
            rows="4"
            placeholder="Brief overview of your professional background and key achievements..."
            value={cvData.summary}
            onChange={(e) => setCvData(prev => ({ ...prev, summary: e.target.value }))}
          />
          <button
            onClick={() => handleAIEnhancement('summary')}
            disabled={isGenerating}
            className="absolute top-3 right-3 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center space-x-1"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">{isGenerating ? 'Enhancing...' : 'AI Enhance'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  const ExperienceStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-light text-gray-900 mb-2">Your Experience</h2>
        <p className="text-gray-600">Add your professional experience</p>
      </div>
      
      {cvData.experience.map((exp, index) => (
        <div key={exp.id} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Experience #{index + 1}</h3>
            <button
              onClick={() => setCvData(prev => ({
                ...prev,
                experience: prev.experience.filter(e => e.id !== exp.id)
              }))}
              className="text-red-500 hover:text-red-700 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                placeholder="Google"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                placeholder="Senior Product Manager"
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              placeholder="Jan 2020 - Present"
              value={exp.duration}
              onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements</label>
            <div className="relative">
              <textarea
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                rows="4"
                placeholder="Describe your key achievements and responsibilities..."
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              />
              <button
                onClick={() => handleAIEnhancement('jobDescription')}
                disabled={isGenerating}
                className="absolute top-3 right-3 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center space-x-1"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">{isGenerating ? 'Enhancing...' : 'AI Enhance'}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={addExperience}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-all flex items-center justify-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Add Experience</span>
      </button>
    </div>
  );

  const EducationStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-light text-gray-900 mb-2">Education</h2>
        <p className="text-gray-600">Add your educational background</p>
      </div>
      
      {cvData.education.map((edu, index) => (
        <div key={edu.id} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Education #{index + 1}</h3>
            <button
              onClick={() => setCvData(prev => ({
                ...prev,
                education: prev.education.filter(e => e.id !== edu.id)
              }))}
              className="text-red-500 hover:text-red-700 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                placeholder="Harvard University"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                placeholder="MBA in Business Administration"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              placeholder="2018 - 2020"
              value={edu.duration}
              onChange={(e) => updateEducation(edu.id, 'duration', e.target.value)}
            />
          </div>
        </div>
      ))}
      
      <button
        onClick={addEducation}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-all flex items-center justify-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Add Education</span>
      </button>
    </div>
  );

  const SkillsStep = () => {
    const [newSkill, setNewSkill] = useState('');
    
    const suggestedSkills = [
      'JavaScript', 'Python', 'React', 'Node.js', 'Leadership', 'Project Management',
      'Data Analysis', 'Strategic Planning', 'Team Building', 'Communication',
      'Problem Solving', 'Agile Methodology'
    ];

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-gray-900 mb-2">Skills & Expertise</h2>
          <p className="text-gray-600">Add your key skills and competencies</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Add Skill</label>
          <div className="flex space-x-2">
            <input
              type="text"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              placeholder="Enter a skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addSkill(newSkill);
                  setNewSkill('');
                }
              }}
            />
            <button
              onClick={() => {
                addSkill(newSkill);
                setNewSkill('');
              }}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all"
            >
              Add
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Suggested Skills</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition-all"
                disabled={cvData.skills.includes(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Your Skills</h3>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill) => (
              <div
                key={skill}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-900 text-white rounded-full text-sm"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-gray-300 hover:text-white transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const CVPreview = () => (
    <div className="bg-white p-8 shadow-lg max-h-screen overflow-y-auto">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-light text-gray-900 mb-2">
          {cvData.personal.name || 'Your Name'}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          {cvData.personal.title || 'Professional Title'}
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {cvData.personal.email && (
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>{cvData.personal.email}</span>
            </div>
          )}
          {cvData.personal.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>{cvData.personal.phone}</span>
            </div>
          )}
          {cvData.personal.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{cvData.personal.location}</span>
            </div>
          )}
          {cvData.personal.website && (
            <div className="flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>{cvData.personal.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {cvData.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {cvData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Experience</h2>
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500">{exp.duration}</span>
              </div>
              {exp.description && (
                <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {exp.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Education</h2>
          {cvData.education.map((edu) => (
            <div key={edu.id} className="mb-3 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-500">{edu.duration}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Edit3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-light text-gray-900">RunMeCV AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-all">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all">
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        index <= currentStep
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`ml-2 text-sm ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                    {index < steps.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-gray-400 mx-4" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step Content */}
            <div className="mb-8">
              {currentStep === 0 && <PersonalInfoStep />}
              {currentStep === 1 && <ExperienceStep />}
              {currentStep === 2 && <EducationStep />}
              {currentStep === 3 && <SkillsStep />}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">Live Preview</h2>
            </div>
            <CVPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunMeCVAI;