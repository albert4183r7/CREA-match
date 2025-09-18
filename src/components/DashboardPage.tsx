import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Download, 
  Trash2, 
  Eye,
  MessageCircle,
  Star,
  Calendar,
  DollarSign,
  Target
} from 'lucide-react';

const DashboardPage = () => {
  const { state: authState } = useAuth();
  const { state } = useApp();
  const { user } = authState;
  const { profiles, jobs } = state;

  // Mock data for charts and statistics
  const creativeStats = {
    portfoliosUploaded: 3,
    jobApplications: 12,
    matchesFound: 8,
    messagesReceived: 5,
    profileViews: 156,
    successRate: 67
  };

  const clientStats = {
    projectsPosted: 2,
    applicationsReceived: 24,
    talentMatched: 15,
    messagesSent: 8,
    projectViews: 89,
    hireRate: 45
  };

  const monthlyData = [
    { month: 'Jan', applications: 2, matches: 1 },
    { month: 'Feb', applications: 4, matches: 2 },
    { month: 'Mar', applications: 3, matches: 2 },
    { month: 'Apr', applications: 6, matches: 4 },
    { month: 'May', applications: 8, matches: 5 },
    { month: 'Jun', applications: 12, matches: 8 }
  ];

  const recentActivity = [
    { type: 'match', description: 'New match found for UI/UX Designer position', time: '2 hours ago' },
    { type: 'message', description: 'Message from Tech Startup Inc', time: '5 hours ago' },
    { type: 'application', description: 'Applied to Brand Identity project', time: '1 day ago' },
    { type: 'view', description: 'Portfolio viewed by Creative Agency XYZ', time: '2 days ago' }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  const stats = user.type === 'creative' ? creativeStats : clientStats;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your {user.type === 'creative' ? 'creative journey' : 'projects'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user.type === 'creative' ? (
            <>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.portfoliosUploaded}</p>
                    <p className="text-sm text-gray-600">Portfolios Uploaded</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.jobApplications}</p>
                    <p className="text-sm text-gray-600">Job Applications</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl">
                    <Users className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.matchesFound}</p>
                    <p className="text-sm text-gray-600">Matches Found</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.successRate}%</p>
                    <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.projectsPosted}</p>
                    <p className="text-sm text-gray-600">Projects Posted</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.applicationsReceived}</p>
                    <p className="text-sm text-gray-600">Applications Received</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl">
                    <Target className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.talentMatched}</p>
                    <p className="text-sm text-gray-600">Talent Matched</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.hireRate}%</p>
                    <p className="text-sm text-gray-600">Hire Rate</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {user.type === 'creative' ? 'Application Trends' : 'Project Performance'}
              </h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            
            {/* Simple Bar Chart */}
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 text-sm text-gray-600">{data.month}</div>
                  <div className="flex-1 flex space-x-2">
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${(data.applications / 12) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(data.matches / 8) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 w-16">{data.applications}/{data.matches}</div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {user.type === 'creative' ? 'Applications' : 'Projects'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {user.type === 'creative' ? 'Matches' : 'Hires'}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    activity.type === 'match' ? 'bg-green-100' :
                    activity.type === 'message' ? 'bg-blue-100' :
                    activity.type === 'application' ? 'bg-orange-100' :
                    'bg-purple-100'
                  }`}>
                    {activity.type === 'match' && <Target className="w-4 h-4 text-green-600" />}
                    {activity.type === 'message' && <MessageCircle className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'application' && <Briefcase className="w-4 h-4 text-orange-600" />}
                    {activity.type === 'view' && <Eye className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio/Projects Management */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {user.type === 'creative' ? 'My Portfolios' : 'My Projects'}
            </h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
          </div>
          
          {user.type === 'creative' ? (
            <div className="space-y-4">
              {profiles.length > 0 ? profiles.map((profile, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{profile.profession}</h4>
                    <p className="text-sm text-gray-600">{profile.generatedBio}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {profile.createdAt.toLocaleDateString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        <Star className="w-3 h-3 inline mr-1" />
                        {(profile.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No portfolios uploaded yet</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.length > 0 ? jobs.slice(0, 3).map((job, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {job.createdAt.toLocaleDateString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        <DollarSign className="w-3 h-3 inline mr-1" />
                        {job.budget}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No projects posted yet</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Subscription Info */}
        <div className="mt-8 bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl border border-orange-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Current Plan: {user.subscription?.charAt(0).toUpperCase() + user.subscription?.slice(1) || 'Free'}
              </h3>
              <p className="text-gray-600">
                {user.subscription === 'free' 
                  ? 'Upgrade to unlock more features and get priority matching'
                  : 'You have access to all premium features'
                }
              </p>
            </div>
            {user.subscription === 'free' && (
              <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                Upgrade Plan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;