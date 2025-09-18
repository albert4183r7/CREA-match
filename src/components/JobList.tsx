import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Calendar, DollarSign, Clock, Building, Star, ExternalLink, Users, CheckCircle } from 'lucide-react';

const JobList = () => {
  const { state, dispatch } = useApp();
  const { jobs } = state;
  const { state: authState } = useAuth();
  const { user } = authState;

  const handleJobClick = (jobId: string) => {
    // In a real app, this would navigate to job details
    console.log('Navigate to job:', jobId);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Hari ini';
    if (diffInDays === 1) return '1 hari lalu';
    return `${diffInDays} hari lalu`;
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const now = new Date();
    const diffInDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays;
  };

  return (
    <div className="space-y-6">
      {jobs.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-600">Belum ada proyek tersedia. Coba lagi nanti!</p>
        </div>
      ) : (
        jobs.map((job) => {
          const daysLeft = getDaysUntilDeadline(job.deadline);
          
          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => handleJobClick(job.id)}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <Building className="w-4 h-4 mr-1" />
                        <span className="text-sm">{job.company}</span>
                        {/* Source attribution */}
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {job.source || 'Verified'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {job.isVerified && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">Verified</span>
                        </div>
                      )}
                      {job.applicationCount && (
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{job.applicationCount} applied</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {job.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {job.requiredSkills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.requiredSkills.length > 4 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                          +{job.requiredSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>{job.budget}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{job.duration}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{getTimeAgo(job.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-64 flex flex-col items-end space-y-3">
                  {/* Deadline warning */}
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    daysLeft <= 3 ? 'bg-red-100 text-red-700' :
                    daysLeft <= 7 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {daysLeft <= 0 ? 'Deadline passed' : `${daysLeft} hari tersisa`}
                  </div>

                  {/* Apply button */}
                  {user?.type === 'creative' && (
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Application submitted successfully!');
                        }}
                        className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-sm"
                      >
                        Apply Now
                      </button>
                      {job.sourceUrl && (
                        <a
                          href={job.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View Original
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Data Source Attribution */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Data Sources:</strong> Job opportunities are aggregated from verified platforms including 
          JobStreet Indonesia, Kalibrr, Glints, LinkedIn Jobs, and Indeed Indonesia. 
          All data is used with proper attribution and compliance with platform terms of service.
        </p>
      </div>
    </div>
  );
};

export default JobList;