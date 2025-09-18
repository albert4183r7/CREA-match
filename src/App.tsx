import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/HomePage';
import PortfolioUpload from './components/PortfolioUpload';
import JobsPage from './components/JobsPage';
import MatchingPage from './components/MatchingPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import MessagingPage from './components/messaging/MessagingPage';
import DashboardPage from './components/DashboardPage';

const AppContent = () => {
  const { state } = useApp();
  const { state: authState } = useAuth();
  const { currentView, isLoading } = state;
  const { user } = authState;

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'upload':
        return user ? <PortfolioUpload /> : <LoginPage 
          onBack={() => dispatch({ type: 'SET_VIEW', payload: 'home' })} 
          onSwitchToRegister={() => dispatch({ type: 'SET_VIEW', payload: 'register' })} 
          onForgotPassword={() => dispatch({ type: 'SET_VIEW', payload: 'forgot-password' })} 
        />;
      case 'jobs':
        return <JobsPage />;
      case 'matches':
        return user ? <MatchingPage /> : <LoginPage 
          onBack={() => dispatch({ type: 'SET_VIEW', payload: 'home' })} 
          onSwitchToRegister={() => dispatch({ type: 'SET_VIEW', payload: 'register' })} 
          onForgotPassword={() => dispatch({ type: 'SET_VIEW', payload: 'forgot-password' })} 
        />;
      case 'dashboard':
        return user ? <DashboardPage /> : <LoginPage 
          onBack={() => dispatch({ type: 'SET_VIEW', payload: 'home' })} 
          onSwitchToRegister={() => dispatch({ type: 'SET_VIEW', payload: 'register' })} 
          onForgotPassword={() => dispatch({ type: 'SET_VIEW', payload: 'forgot-password' })} 
        />;
      case 'messages':
        return user ? <MessagingPage /> : <LoginPage 
          onBack={() => dispatch({ type: 'SET_VIEW', payload: 'home' })} 
          onSwitchToRegister={() => dispatch({ type: 'SET_VIEW', payload: 'register' })} 
          onForgotPassword={() => dispatch({ type: 'SET_VIEW', payload: 'forgot-password' })} 
        />;
      case 'login':
        return <LoginPage 
          onBack={() => dispatch({ type: 'SET_VIEW', payload: 'home' })} 
          onSwitchToRegister={() => dispatch({ type: 'SET_VIEW', payload: 'register' })} 
          onForgotPassword={() => dispatch({ type: 'SET_VIEW', payload: 'forgot-password' })} 
        />;
      case 'register':
        return <RegisterPage 
          onBack={() => dispatch({ type: 'SET_VIEW', payload: 'home' })} 
          onSwitchToLogin={() => dispatch({ type: 'SET_VIEW', payload: 'login' })} 
        />;
      case 'forgot-password':
        return <ForgotPasswordPage onBack={() => dispatch({ type: 'SET_VIEW', payload: 'login' })} />;
      default:
        return <HomePage />;
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Full-screen views without header/footer
  const fullScreenViews = ['login', 'register', 'forgot-password', 'messages', 'dashboard'];
  const isFullScreen = fullScreenViews.includes(currentView);

  if (isFullScreen) {
    return (
      <div className="min-h-screen">
        {renderCurrentView()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {renderCurrentView()}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;