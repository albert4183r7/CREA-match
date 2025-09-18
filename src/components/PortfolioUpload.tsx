import React, { useState } from 'react';
import { Upload, FileText, Link, Loader, CheckCircle, Sparkles, User, MapPin, Clock, DollarSign } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { AIService } from '../services/aiService';
import { CreativeProfile } from '../types';

const PortfolioUpload = () => {
  const { dispatch } = useApp();
  const { state: authState } = useAuth();
  const { user } = authState;
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CreativeProfile | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: 'Jakarta',
    portfolioText: '',
    portfolioLinks: '',
    availability: 'immediate' as const
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.portfolioText.trim() || !formData.name.trim()) return;

    setIsProcessing(true);
    
    try {
      // Step 1: Classify profession
      const classification = await AIService.classifyPortfolio(formData.portfolioText);
      
      // Step 2: Generate metadata
      const metadata = await AIService.generateMetadata(formData.portfolioText, classification.profession);
      
      // Step 3: Generate embedding
      const embedding = AIService.generateEmbedding(formData.portfolioText);
      
      // Create profile
      const profile: CreativeProfile = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        profession: classification.profession,
        confidence: classification.confidence,
        skills: classification.extractedSkills,
        portfolio: formData.portfolioText,
        generatedBio: metadata.bio,
        tags: metadata.tags,
        sampleProjects: metadata.sampleProjects,
        location: formData.location,
        availability: formData.availability,
        rateRange: 'Rp 5.000.000 - 15.000.000',
        createdAt: new Date(),
        embedding
      };

      setResult(profile);
      dispatch({ type: 'ADD_PROFILE', payload: profile });
      
    } catch (error) {
      console.error('Error processing portfolio:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleViewJobs = () => {
    dispatch({ type: 'SET_VIEW', payload: 'jobs' });
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-8 border-b border-green-100">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Portfolio Berhasil Dianalisis!
              </h2>
              <p className="text-gray-600 text-center">
                AI telah mengklasifikasi dan memperkaya profil kreatif Anda
              </p>
            </div>

            <div className="p-6">
              {/* Classification Result */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Klasifikasi AI</h3>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-500">AWS Bedrock</span>
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-orange-700">{result.profession}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-700">
                        {(result.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                  </div>
                  <p className="text-orange-600">{result.generatedBio}</p>
                </div>
              </div>

              {/* Profile Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{result.name}</p>
                      <p className="text-sm text-gray-500">{result.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{result.location}</p>
                      <p className="text-sm text-gray-500">Location</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {result.availability === 'immediate' ? 'Segera Tersedia' : 
                         result.availability === 'within_week' ? 'Dalam Seminggu' :
                         result.availability === 'within_month' ? 'Dalam Sebulan' : 'Sedang Sibuk'}
                      </p>
                      <p className="text-sm text-gray-500">Availability</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{result.rateRange}</p>
                      <p className="text-sm text-gray-500">Rate Range</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">Skills Terdeteksi</h4>
                <div className="flex flex-wrap gap-2">
                  {result.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">Tags Generatif</h4>
                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Projects */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">Contoh Proyek yang Cocok</h4>
                <div className="space-y-3">
                  {result.sampleProjects.map((project, index) => (
                    <div key={index} className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                      <p className="text-gray-700">{project}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={handleViewJobs}
                  className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                >
                  Lihat Proyek yang Cocok
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:border-gray-400 transition-colors"
                >
                  Upload Portfolio Lain
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-50 to-blue-50 px-6 py-8 border-b border-gray-200">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Upload Portfolio Kreatif
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                AI akan menganalisis portofolio Anda untuk mengklasifikasi profesi, 
                mengekstrak skills, dan generate metadata yang relevan
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <option value="Malang">Malang</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value as any }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="immediate">Segera Tersedia</option>
                  <option value="within_week">Dalam Seminggu</option>
                  <option value="within_month">Dalam Sebulan</option>
                  <option value="busy">Sedang Sibuk</option>
                </select>
              </div>
            </div>

            {/* Portfolio Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Portfolio *
              </label>
              <div className="relative">
                <textarea
                  required
                  rows={6}
                  value={formData.portfolioText}
                  onChange={(e) => setFormData(prev => ({ ...prev, portfolioText: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Deskripsikan pengalaman, keahlian, dan portofolio kreatif Anda. Contoh: 'Saya adalah motion editor dengan pengalaman 3 tahun menggunakan After Effects dan Premiere Pro. Saya spesialisasi dalam motion graphics untuk brand content dan social media campaigns...'"
                />
                <FileText className="absolute top-3 right-3 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Minimum 100 karakter untuk analisis yang optimal
              </p>
            </div>

            {/* Portfolio Links */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link Portfolio (Opsional)
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  value={formData.portfolioLinks}
                  onChange={(e) => setFormData(prev => ({ ...prev, portfolioLinks: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="https://behance.net/yourportfolio&#10;https://instagram.com/yourwork&#10;https://dribbble.com/yourprofile"
                />
                <Link className="absolute top-3 right-3 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Satu link per baris
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isProcessing || !formData.portfolioText.trim() || !formData.name.trim()}
                className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Memproses dengan AI...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Analisis Portfolio dengan AI
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Processing Steps */}
        {isProcessing && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Proses AI Berlangsung:</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Loader className="w-4 h-4 animate-spin text-orange-500" />
                <span className="text-sm text-gray-600">Mengklasifikasi profesi kreatif...</span>
              </div>
              <div className="flex items-center space-x-3">
                <Loader className="w-4 h-4 animate-spin text-blue-500" />
                <span className="text-sm text-gray-600">Mengekstrak skills dan metadata...</span>
              </div>
              <div className="flex items-center space-x-3">
                <Loader className="w-4 h-4 animate-spin text-teal-500" />
                <span className="text-sm text-gray-600">Generate embeddings untuk matching...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioUpload;