import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { skillDatabase } from '../data/professions';
import { AIService } from '../services/aiService';
import { JobOpportunity } from '../types';
import { ArrowLeft, Plus, X, Loader, CheckCircle } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const JobPostForm = ({ onBack }: Props) => {
  const { dispatch } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    budget: '',
    duration: '',
    location: 'Jakarta',
    deadline: '',
    requiredSkills: [] as string[],
    newSkill: ''
  });

  const handleSkillAdd = () => {
    if (formData.newSkill.trim() && !formData.requiredSkills.includes(formData.newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, prev.newSkill.trim()],
        newSkill: ''
      }));
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSkillSelect = (skill: string) => {
    if (!formData.requiredSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skill]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Generate embedding for the job description
      const embedding = AIService.generateEmbedding(
        `${formData.title} ${formData.description} ${formData.requiredSkills.join(' ')}`
      );

      // Create job posting
      const job: JobOpportunity = {
        id: Date.now().toString(),
        title: formData.title,
        company: formData.company,
        description: formData.description,
        requiredSkills: formData.requiredSkills,
        budget: formData.budget,
        duration: formData.duration,
        location: formData.location,
        deadline: new Date(formData.deadline),
        postedBy: formData.company,
        createdAt: new Date(),
        embedding
      };

      // Add to state
      dispatch({ type: 'ADD_JOB', payload: job });
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsPosted(true);
    } catch (error) {
      console.error('Error posting job:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isPosted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-8 border-b border-green-100">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Proyek Berhasil Diposting!
              </h2>
              <p className="text-gray-600">
                AI sedang mencari creative professional yang tepat untuk proyek Anda
              </p>
            </div>
          </div>

          <div className="p-6 text-center">
            <p className="text-gray-600 mb-6">
              Anda akan mendapatkan notifikasi ketika ada creative professional yang cocok dengan proyek Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => dispatch({ type: 'SET_VIEW', payload: 'matches' })}
                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Lihat Matching Results
              </button>
              <button
                onClick={onBack}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors"
              >
                Post Another Project
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const suggestedSkills = skillDatabase.filter(skill => 
    skill.toLowerCase().includes(formData.newSkill.toLowerCase()) ||
    formData.description.toLowerCase().includes(skill.toLowerCase())
  ).slice(0, 8);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-50 to-blue-50 px-6 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-white rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Post Creative Project
                </h1>
                <p className="text-gray-600">
                  AI akan mencocokkan dengan creative professional terbaik
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Proyek *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Brand Identity Design untuk Startup"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Perusahaan *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="PT. Creative Company"
              />
            </div>
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Proyek *
            </label>
            <textarea
              required
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Deskripsikan proyek secara detail, termasuk deliverables, style yang diinginkan, dan ekspektasi..."
            />
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget
              </label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Rp 15.000.000 - 25.000.000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durasi Proyek
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="6 minggu"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="Jakarta">Jakarta</option>
                <option value="Bandung">Bandung</option>
                <option value="Surabaya">Surabaya</option>
                <option value="Yogyakarta">Yogyakarta</option>
                <option value="Bali">Bali</option>
                <option value="Solo">Solo</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deadline Aplikasi
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills yang Dibutuhkan
            </label>
            
            {/* Current Skills */}
            {formData.requiredSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.requiredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill)}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Add New Skill */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={formData.newSkill}
                onChange={(e) => setFormData(prev => ({ ...prev, newSkill: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleSkillAdd())}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Tambah skill yang dibutuhkan"
              />
              <button
                type="button"
                onClick={handleSkillAdd}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Suggested Skills */}
            {suggestedSkills.length > 0 && formData.newSkill && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Saran skills:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.map((skill, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSkillSelect(skill)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isProcessing || !formData.title.trim() || !formData.company.trim() || !formData.description.trim()}
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Memposting Proyek...
                </>
              ) : (
                'Post Proyek'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPostForm;