import React from 'react';
import { Brain, Users, Briefcase, Upload, PlusCircle, MessageCircle, User, LogOut, BarChart3 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { state, dispatch } = useApp();
  const { currentView } = state;
  const { state: authState, logout } = useAuth();
  const { user } = authState;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewChange = (view: typeof currentView) => {
    dispatch({ type: 'SET_VIEW', payload: view });
  };

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      dispatch({ type: 'SET_VIEW', payload: 'register' });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-gray-900">CREA-Match</h1>
              <p className="text-xs text-gray-500 truncate">Smart Creative Matching</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {currentView === 'home' ? (
              <>
                <button
                  onClick={() => scrollToSection('demo')}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  Demo
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  FAQ
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  Contact
                </button>
              </>
            ) : null}

            {user?.type === 'creative' ? (
              <>
                <button
                  onClick={() => handleViewChange('dashboard')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'dashboard'
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => handleViewChange('upload')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'upload'
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Portfolio</span>
                </button>
                <button
                  onClick={() => handleViewChange('jobs')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'jobs'
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Browse Jobs</span>
                </button>
                <button
                  onClick={() => handleViewChange('messages')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'messages'
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Messages</span>
                </button>
              </>
            ) : user?.type === 'client' ? (
              <>
                <button
                  onClick={() => handleViewChange('dashboard')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'dashboard'
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => handleViewChange('jobs')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'jobs'
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Post Project</span>
                </button>
                <button
                  onClick={() => handleViewChange('matches')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'matches'
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Find Talent</span>
                </button>
                <button
                  onClick={() => handleViewChange('messages')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'messages'
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Messages</span>
                </button>
              </>
            ) : null}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded-lg">
                  <img
                    src={user.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1`}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-700">{user.name}</span>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <button
                  onClick={handleAuthAction}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleAuthAction}
                  className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-4 py-3">
          {currentView === 'home' && !user ? (
            <div className="grid grid-cols-4 gap-1">
              <button
                onClick={() => scrollToSection('demo')}
                className="flex flex-col items-center justify-center px-2 py-2 rounded-lg text-xs font-medium text-gray-600"
              >
                <span>Demo</span>
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="flex flex-col items-center justify-center px-2 py-2 rounded-lg text-xs font-medium text-gray-600"
              >
                <span>Pricing</span>
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="flex flex-col items-center justify-center px-2 py-2 rounded-lg text-xs font-medium text-gray-600"
              >
                <span>FAQ</span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="flex flex-col items-center justify-center px-2 py-2 rounded-lg text-xs font-medium text-gray-600"
              >
                <span>Contact</span>
              </button>
            </div>
          ) : null}
          
          {user && (
            <div className="grid grid-cols-4 gap-1">
              <button
                onClick={() => handleViewChange('dashboard')}
                className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg text-xs font-medium ${
                  currentView === 'dashboard' ? 'bg-orange-50 text-orange-700' : 'text-gray-600'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              
              {user?.type === 'creative' ? (
                <>
                  <button
                    onClick={() => handleViewChange('upload')}
                    className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg text-xs font-medium ${
                      currentView === 'upload' ? 'bg-orange-50 text-orange-700' : 'text-gray-600'
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                  </button>
                  <button
                    onClick={() => handleViewChange('jobs')}
                    className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg text-xs font-medium ${
                      currentView === 'jobs' ? 'bg-orange-50 text-orange-700' : 'text-gray-600'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Jobs</span>
                  </button>
                  <button
                    onClick={() => handleViewChange('messages')}
                    className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg text-xs font-medium ${
                      currentView === 'messages' ? 'bg-orange-50 text-orange-700' : 'text-gray-600'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Messages</span>
                  </button>
                </>
              ) : user?.type === 'client' ? (
                <>
                  <button
                    onClick={() => handleViewChange('jobs')}
                    className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg text-xs font-medium ${
                      currentView === 'jobs' ? 'bg-orange-50 text-orange-700' : 'text-gray-600'
                    }`}
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Post</span>
                  </button>
                  <button
                    onClick={() => handleViewChange('matches')}
                    className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg text-xs font-medium ${
                      currentView === 'matches' ? 'bg-orange-50 text-orange-700' : 'text-gray-600'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Talent</span>
                  </button>
                  <button
                    onClick={() => handleViewChange('messages')}
                    className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg text-xs font-medium ${
                      currentView === 'messages' ? 'bg-orange-50 text-orange-700' : 'text-gray-600'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Messages</span>
                  </button>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;