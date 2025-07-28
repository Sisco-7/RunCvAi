import React, { useState, useCallback } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Download, Plus, Trash2, Calendar, Building, Globe } from 'lucide-react';

const CVGenerator = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      summary: ''
    },
    experience: [
      {
        id: 1,
        position: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ],
    education: [
      {
        id: 1,
        degree: '',
        institution: '',
        location: '',
        graduationDate: '',
        gpa: ''
      }
    ],
    skills: [''],
    certifications: [
      {
        id: 1,
        name: '',
        issuer: '',
        date: ''
      }
    ]
  });

  const [activeSection, setActiveSection] = useState('personal');

  // Prevent form closure by stabilizing event handlers
  const updatePersonalInfo = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  }, []);

  const addArrayItem = useCallback((e, section, newItem) => {
    e.preventDefault(); // Prevent default behavior
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...newItem, id: Date.now() }]
    }));
  }, []);

  const updateArrayItem = useCallback((section, id, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  }, []);

  const removeArrayItem = useCallback((e, section, id) => {
    e.preventDefault(); // Prevent default behavior
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  }, []);

  const updateSkill = useCallback((index, value) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  }, []);

  const addSkill = useCallback((e) => {
    e.preventDefault(); // Prevent default behavior
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  }, []);

  const removeSkill = useCallback((e, index) => {
    e.preventDefault(); // Prevent default behavior
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  }, []);

  const generatePDF = useCallback((e) => {
    e.preventDefault(); // Prevent default behavior
    window.print();
  }, []);

  // Log section changes for debugging
  const handleSectionChange = useCallback((sectionId) => {
    console.log(`Switching to section: ${sectionId}`);
    setActiveSection(sectionId);
  }, []);

  const PersonalInfoForm = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
          <User size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
          <p className="text-gray-600">Tell us about yourself</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            placeholder="John Doe"
            value={formData.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            placeholder="john.doe@email.com"
            value={formData.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <input
            type="text"
            placeholder="New York, NY"
            value={formData.personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Website/Portfolio</label>
          <input
            type="url"
            placeholder="https://johndoe.com"
            value={formData.personalInfo.website}
            onChange={(e) => updatePersonalInfo('website', e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Summary</label>
        <textarea
          placeholder="Experienced software developer with 5+ years of expertise in full-stack development..."
          value={formData.personalInfo.summary}
          onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          rows={5}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
        />
      </div>
    </div>
  );

  const ExperienceForm = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl text-white">
            <Briefcase size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Work Experience</h3>
            <p className="text-gray-600">Your professional journey</p>
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => addArrayItem(e, 'experience', {position: '', company: '', location: '', startDate: '', endDate: '', current: false, description: ''})}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>
      
      {formData.experience.map((exp, index) => (
        <div key={exp.id} className="p-6 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-lg text-gray-800">Experience #{index + 1}</h4>
            {formData.experience.length > 1 && (
              <button
                type="button"
                onClick={(e) => removeArrayItem(e, 'experience', exp.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Position/Job Title *</label>
              <input
                type="text"
                placeholder="Senior Software Engineer"
                value={exp.position}
                onChange={(e) => updateArrayItem('experience', exp.id, 'position', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
              <input
                type="text"
                placeholder="Tech Corp Inc."
                value={exp.company}
                onChange={(e) => updateArrayItem('experience', exp.id, 'company', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                placeholder="San Francisco, CA"
                value={exp.location}
                onChange={(e) => updateArrayItem('experience', exp.id, 'location', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => updateArrayItem('experience', exp.id, 'startDate', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => updateArrayItem('experience', exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-gray-50 focus:bg-white disabled:bg-gray-200 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => {
                    updateArrayItem('experience', exp.id, 'current', e.target.checked);
                    if (e.target.checked) {
                      updateArrayItem('experience', exp.id, 'endDate', '');
                    }
                  }}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                Currently working here
              </label>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description & Achievements</label>
            <textarea
              placeholder="• Led a team of 5 developers to deliver high-quality software solutions&#10;• Improved system performance by 40% through code optimization&#10;• Implemented CI/CD pipelines reducing deployment time by 60%"
              value={exp.description}
              onChange={(e) => updateArrayItem('experience', exp.id, 'description', e.target.value)}
              rows={5}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const EducationForm = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white">
            <GraduationCap size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Education</h3>
            <p className="text-gray-600">Your academic background</p>
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => addArrayItem(e, 'education', {degree: '', institution: '', location: '', graduationDate: '', gpa: ''})}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus size={18} />
          Add Education
        </button>
      </div>
      
      {formData.education.map((edu, index) => (
        <div key={edu.id} className="p-6 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-lg text-gray-800">Education #{index + 1}</h4>
            {formData.education.length > 1 && (
              <button
                type="button"
                onClick={(e) => removeArrayItem(e, 'education', edu.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Degree/Qualification *</label>
              <input
                type="text"
                placeholder="Bachelor of Science in Computer Science"
                value={edu.degree}
                onChange={(e) => updateArrayItem('education', edu.id, 'degree', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Institution Name *</label>
              <input
                type="text"
                placeholder="University of Technology"
                value={edu.institution}
                onChange={(e) => updateArrayItem('education', edu.id, 'institution', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                placeholder="Boston, MA"
                value={edu.location}
                onChange={(e) => updateArrayItem('education', edu.id, 'location', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Graduation Date</label>
              <input
                type="date"
                value={edu.graduationDate}
                onChange={(e) => updateArrayItem('education', edu.id, 'graduationDate', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">GPA (optional)</label>
              <input
                type="text"
                placeholder="3.8/4.0"
                value={edu.gpa}
                onChange={(e) => updateArrayItem('education', edu.id, 'gpa', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const SkillsForm = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white">
            <Award size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Skills</h3>
            <p className="text-gray-600">Your technical and soft skills</p>
          </div>
        </div>
        <button
          type="button"
          onClick={addSkill}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus size={18} />
          Add Skill
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formData.skills.map((skill, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="text"
              placeholder="e.g., JavaScript, Project Management, Public Speaking"
              value={skill}
              onChange={(e) => updateSkill(index, e.target.value)}
              className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-gray-50 focus:bg-white"
            />
            {formData.skills.length > 1 && (
              <button
                type="button"
                onClick={(e) => removeSkill(e, index)}
                className="p-4 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const CertificationsForm = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl text-white">
            <Award size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Certifications</h3>
            <p className="text-gray-600">Your professional credentials</p>
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => addArrayItem(e, 'certifications', {name: '', issuer: '', date: ''})}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl hover:from-indigo-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus size={18} />
          Add Certification
        </button>
      </div>
      
      {formData.certifications.map((cert, index) => (
        <div key={cert.id} className="p-6 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-lg text-gray-800">Certification #{index + 1}</h4>
            {formData.certifications.length > 1 && (
              <button
                type="button"
                onClick={(e) => removeArrayItem(e, 'certifications', cert.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Certification Name *</label>
              <input
                type="text"
                placeholder="AWS Solutions Architect"
                value={cert.name}
                onChange={(e) => updateArrayItem('certifications', cert.id, 'name', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Issuing Organization *</label>
              <input
                type="text"
                placeholder="Amazon Web Services"
                value={cert.issuer}
                onChange={(e) => updateArrayItem('certifications', cert.id, 'issuer', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date Obtained</label>
              <input
                type="date"
                value={cert.date}
                onChange={(e) => updateArrayItem('certifications', cert.id, 'date', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const CVPreview = () => (
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none">
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-3">{formData.personalInfo.fullName || 'Your Name'}</h1>
          
          <div className="flex flex-wrap justify-center gap-6 text-slate-200 mb-4">
            {formData.personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span className="text-sm">{formData.personalInfo.email}</span>
              </div>
            )}
            {formData.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span className="text-sm">{formData.personalInfo.phone}</span>
              </div>
            )}
            {formData.personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="text-sm">{formData.personalInfo.location}</span>
              </div>
            )}
            {formData.personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe size={16} />
                <span className="text-sm">{formData.personalInfo.website}</span>
              </div>
            )}
          </div>
          
          {formData.personalInfo.summary && (
            <div className="max-w-3xl mx-auto">
              <p className="text-slate-100 leading-relaxed text-center">{formData.personalInfo.summary}</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {formData.experience.some(exp => exp.position || exp.company) && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Briefcase size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Professional Experience</h2>
            </div>
            
            <div className="space-y-6">
              {formData.experience.map((exp, index) => (
                (exp.position || exp.company) && (
                  <div key={exp.id} className="relative pl-8 border-l-4 border-blue-200">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                          <div className="text-blue-600 font-semibold text-lg">
                            {exp.company}{exp.company && exp.location && ', '}{exp.location}
                          </div>
                        </div>
                        <div className="text-right text-gray-600 bg-white px-3 py-1 rounded-full text-sm font-medium">
                          {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', {month: 'short', year: 'numeric'})}
                          {exp.startDate && (exp.endDate || exp.current) && ' - '}
                          {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', {month: 'short', year: 'numeric'}) : ''}
                        </div>
                      </div>
                      {exp.description && (
                        <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                          {exp.description}
                        </div>
                      )}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {formData.education.some(edu => edu.degree || edu.institution) && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Education</h2>
            </div>
            
            <div className="space-y-4">
              {formData.education.map((edu, index) => (
                (edu.degree || edu.institution) && (
                  <div key={edu.id} className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                        <div className="text-purple-600 font-semibold">
                          {edu.institution}{edu.institution && edu.location && ', '}{edu.location}
                        </div>
                      </div>
                      <div className="text-right text-gray-600">
                        <div className="bg-white px-3 py-1 rounded-full text-sm font-medium">
                          {edu.graduationDate && new Date(edu.graduationDate).toLocaleDateString('en-US', {month: 'short', year: 'numeric'})}
                        </div>
                        {edu.gpa && <div className="text-sm mt-1 text-gray-500">GPA: {edu.gpa}</div>}
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {formData.skills.some(skill => skill.trim()) && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <Award size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Skills & Expertise</h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {formData.skills.filter(skill => skill.trim()).map((skill, index) => (
                <span key={index} className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 rounded-full text-sm font-medium border border-blue-200 hover:shadow-md transition-shadow">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {formData.certifications.some(cert => cert.name || cert.issuer) && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                <Award size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Certifications</h2>
            </div>
            
            <div className="space-y-4">
              {formData.certifications.map((cert, index) => (
                (cert.name || cert.issuer) && (
                  <div key={cert.id} className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{cert.name}</h3>
                        {cert.issuer && <div className="text-indigo-600 font-semibold">{cert.issuer}</div>}
                      </div>
                      {cert.date && (
                        <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                          {new Date(cert.date).toLocaleDateString('en-US', {month: 'short', year: 'numeric'})}
                        </div>
                      )}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User, color: 'from-blue-500 to-purple-600' },
    { id: 'experience', label: 'Experience', icon: Briefcase, color: 'from-green-500 to-teal-600' },
    { id: 'education', label: 'Education', icon: GraduationCap, color: 'from-purple-500 to-pink-600' },
    { id: 'skills', label: 'Skills', icon: Award, color: 'from-orange-500 to-red-600' },
    { id: 'certifications', label: 'Certifications', icon: Award, color: 'from-indigo-500 to-blue-600' }
  ];

  const renderForm = () => {
    switch(activeSection) {
      case 'personal': return <PersonalInfoForm />;
      case 'experience': return <ExperienceForm />;
      case 'education': return <EducationForm />;
      case 'skills': return <SkillsForm />;
      case 'certifications': return <CertificationsForm />;
      default: return <PersonalInfoForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              Professional CV Generator
            </h1>
            <p className="text-xl text-gray-600">Create your stunning CV in minutes with our modern design</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b">
                <div className="flex flex-wrap gap-3">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => handleSectionChange(section.id)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-200 font-semibold ${
                          activeSection === section.id
                            ? `bg-gradient-to-r ${section.color} text-white shadow-lg transform scale-105`
                            : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200'
                        }`}
                      >
                        <Icon size={20} />
                        {section.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-8">
                {renderForm()}
              </div>
            </div>
          </div>

          <div className="xl:col-span-2">
            <div className="sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Live Preview</h2>
                <button
                  type="button"
                  onClick={generatePDF}
                  className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
                >
                  <Download size={20} />
                  Download PDF
                </button>
              </div>
              <CVPreview />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .bg-white.shadow-2xl.rounded-2xl.overflow-hidden.print\\:shadow-none.print\\:rounded-none,
          .bg-white.shadow-2xl.rounded-2xl.overflow-hidden.print\\:shadow-none.print\\:rounded-none * {
            visibility: visible;
          }
          .bg-white.shadow-2xl.rounded-2xl.overflow-hidden.print\\:shadow-none.print\\:rounded-none {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          .sticky {
            position: static !important;
          }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default CVGenerator;
