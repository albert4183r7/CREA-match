import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { AIService } from '../services/aiService';
import { MatchResult } from '../types';
import { Users, Target, Zap, Brain, Star, Mail, MapPin, Clock, ArrowRight, Loader } from 'lucide-react';

const MatchingPage = () => {
  const { state } = useApp();
  const { profiles, jobs } = state;
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState<string>('');

  useEffect(() => {
    const loadMatches = async () => {
      if (profiles.length > 0 && jobs.length > 0) {
        setIsLoading(true);
        const allMatches: MatchResult[] = [];
        
        for (const profile of profiles) {
          const profileMatches = await AIService.performMatching(profile, jobs);
          allMatches.push(...profileMatches);
        }
        
        // Sort by score and remove duplicates
        const uniqueMatches = allMatches
          .sort((a, b) => b.score - a.score)
          .filter((match, index, arr) => 
            arr.findIndex(m => m.profile.id === match.profile.id && m.job.id === match.job.id) === index
          );
        
        setMatches(uniqueMatches);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    loadMatches();
  }, [profiles, jobs]);

  const filteredMatches = selectedJobId 
    ? matches.filter(match => match.job.id === selectedJobId)
    : matches;

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-50';
    if (score >= 0.6) return 'text-orange-600 bg-orange-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.8) return 'Excellent Match';
    if (score >= 0.6) return 'Good Match';
    return 'Potential Match';
  };

  if (profiles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mx-auto mb-6">
                <Users className="w-8 h-8 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Belum Ada Creative Professional
              </h2>
              <p className="text-gray-600 mb-6">
                Saat ini belum ada creative professional yang terdaftar. 
                Matching akan otomatis tersedia setelah ada portfolio yang diupload.
              </p>
              <button
                onClick={() => dispatch({ type: 'SET_VIEW', payload: 'home' })}
                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Kembali ke Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Smart Matching Results
          </h1>
          <p className="text-lg text-gray-600">
            AI telah mencocokkan creative professional dengan proyek berdasarkan semantic similarity dan skill matching
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{profiles.length}</p>
                <p className="text-sm text-gray-600">Creative Professionals</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                <p className="text-sm text-gray-600">Active Projects</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl">
                <Zap className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{matches.length}</p>
                <p className="text-sm text-gray-600">Total Matches</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5 text-orange-500" />
              <span className="font-medium text-gray-900">Filter by Project:</span>
            </div>
            
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Projects</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} - {job.company}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <Loader className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Melakukan semantic matching...</p>
          </div>
        )}

        {/* Matches */}
        {!isLoading && (
          <div className="space-y-6">
            {filteredMatches.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-600">Belum ada matching results.</p>
              </div>
            ) : (
              filteredMatches.slice(0, 20).map((match, index) => (
                <div
                  key={`${match.profile.id}-${match.job.id}-${index}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Profile Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {match.profile.name}
                          </h3>
                          <p className="text-orange-600 font-medium">{match.profile.profession}</p>
                          <p className="text-gray-600 text-sm mt-1">{match.profile.generatedBio}</p>
                        </div>
                        
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(match.score)}`}>
                          {(match.score * 100).toFixed(0)}% • {getScoreLabel(match.score)}
                        </div>
                      </div>

                      {/* Profile Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{match.profile.location}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>
                            {match.profile.availability === 'immediate' ? 'Available Now' : 
                             match.profile.availability === 'within_week' ? 'Within Week' :
                             match.profile.availability === 'within_month' ? 'Within Month' : 'Busy'}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <Star className="w-4 h-4 mr-2" />
                          <span>{match.profile.rateRange}</span>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {match.profile.skills.slice(0, 5).map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {match.profile.skills.length > 5 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                              +{match.profile.skills.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-1">Matched with:</h4>
                        <p className="text-sm text-gray-700 font-medium">{match.job.title}</p>
                        <p className="text-sm text-gray-600">{match.job.company} • {match.job.location}</p>
                      </div>
                    </div>

                    {/* Match Reasons */}
                    <div className="lg:w-80">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Brain className="w-4 h-4 mr-2 text-orange-500" />
                        Match Reasons
                      </h4>
                      
                      <div className="space-y-3">
                        {match.reasons.map((reason, reasonIndex) => (
                          <div key={reasonIndex} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700 capitalize">
                                {reason.type.replace('_', ' ')}
                              </span>
                              <span className="text-sm font-bold text-gray-900">
                                {(reason.value * 100).toFixed(0)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                              <div
                                className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full"
                                style={{ width: `${reason.value * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-600">{reason.description}</p>
                          </div>
                        ))}
                      </div>
                      
                      {/* Contact Button */}
                      <button
                        onClick={() => alert(`Feature untuk kontak ${match.profile.name} akan segera tersedia!`)}
                        className="w-full mt-4 flex items-center justify-center px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Creative
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Show more button if there are more matches */}
        {!isLoading && filteredMatches.length > 20 && (
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Show More Results ({filteredMatches.length - 20} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchingPage;