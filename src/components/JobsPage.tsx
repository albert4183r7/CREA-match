import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import JobList from './JobList';
import JobPostForm from './JobPostForm';
import { PlusCircle, Briefcase } from 'lucide-react';

const JobsPage = () => {
  const { state } = useApp();
  const { state: authState } = useAuth();
  const { user } = authState;
  const [showPostForm, setShowPostForm] = useState(false);

  if (user?.type === 'client') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!showPostForm ? (
            <div className="text-center">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
                <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mx-auto mb-6">
                  <Briefcase className="w-8 h-8 text-orange-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Post Your Creative Project
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Temukan talenta kreatif terbaik Indonesia untuk proyek Anda. 
                  AI kami akan mencocokkan dengan creative professional yang tepat.
                </p>
                <button
                  onClick={() => setShowPostForm(true)}
                  className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Post New Project
                </button>
              </div>
            </div>
          ) : (
            <JobPostForm onBack={() => setShowPostForm(false)} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Peluang Proyek Kreatif
          </h1>
          <p className="text-lg text-gray-600">
            Temukan proyek yang cocok dengan keahlian kreatif Anda
          </p>
        </div>

        <JobList />
      </div>
    </div>
  );
};

export default JobsPage;