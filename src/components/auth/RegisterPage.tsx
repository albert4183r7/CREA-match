import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Chrome, Briefcase, Palette, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

interface Props {
  onBack: () => void;
  onSwitchToLogin: () => void;
}

const RegisterPage = ({ onBack, onSwitchToLogin }: Props) => {
  const { register, loginWithGoogle, state } = useAuth();
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'creative' as 'creative' | 'client',
    agreeToTerms: false,
    profession: '',
    companyName: '',
    industry: '',
    position: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [customProfession, setCustomProfession] = useState('');
  const [customIndustry, setCustomIndustry] = useState('');
  const [showCustomProfession, setShowCustomProfession] = useState(false);
  const [showCustomIndustry, setShowCustomIndustry] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const creativeProfessions = [
    'Illustrator', 'Graphic Designer', 'UI/UX Designer', 'Motion Designer',
    'Video Editor', 'Photographer', 'Sound Designer', 'Animator',
    'Web Designer', 'Brand Designer', 'Art Director', 'Creative Director',
    'Copywriter', 'Content Creator', 'Others'
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce',
    'Media & Entertainment', 'Manufacturing', 'Real Estate', 'Food & Beverage',
    'Fashion', 'Automotive', 'Travel & Tourism', 'Non-profit', 'Others'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Password validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name, formData.userType);
      dispatch({ type: 'SET_VIEW', payload: 'home' });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      dispatch({ type: 'SET_VIEW', payload: 'home' });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl mx-auto mb-4">
                <span className="text-2xl font-bold text-white">CM</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Join CREA-Match</h1>
              <p className="text-gray-600 mb-4">Create your account and start connecting</p>
              
              {/* Sign In Link */}
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* User Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I want to join as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, userType: 'creative' }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.userType === 'creative'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Palette className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Creative</div>
                  <div className="text-xs text-gray-500">Find projects</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, userType: 'client' }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.userType === 'client'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Briefcase className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Client</div>
                  <div className="text-xs text-gray-500">Find talent</div>
                </button>
              </div>
            </div>

            {/* Google Register */}
            <button
              onClick={handleGoogleLogin}
              disabled={state.isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors mb-6 disabled:opacity-50"
            >
              <Chrome className="w-5 h-5 mr-3 text-gray-600" />
              <span className="font-medium text-gray-700">Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or register with email</span>
              </div>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.userType === 'client' ? 'Full Name (HR/Contact Person)' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder={formData.userType === 'client' ? 'Contact person name' : 'Enter your full name'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Creative Profession Selection */}
              {formData.userType === 'creative' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Creative Profession
                  </label>
                  <select
                    value={formData.profession}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({ ...prev, profession: value }));
                      setShowCustomProfession(value === 'Others');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Select your profession</option>
                    {creativeProfessions.map((profession) => (
                      <option key={profession} value={profession}>{profession}</option>
                    ))}
                  </select>
                  {showCustomProfession && (
                    <input
                      type="text"
                      value={customProfession}
                      onChange={(e) => {
                        setCustomProfession(e.target.value);
                        setFormData(prev => ({ ...prev, profession: e.target.value }));
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 mt-2"
                      placeholder="Enter your profession"
                      required
                    />
                  )}
                </div>
              )}

              {/* Client Company Information */}
              {formData.userType === 'client' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Your company name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData(prev => ({ ...prev, industry: value }));
                        setShowCustomIndustry(value === 'Others');
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    >
                      <option value="">Select industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                    {showCustomIndustry && (
                      <input
                        type="text"
                        value={customIndustry}
                        onChange={(e) => {
                          setCustomIndustry(e.target.value);
                          setFormData(prev => ({ ...prev, industry: e.target.value }));
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 mt-2"
                        placeholder="Enter your industry"
                        required
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Position
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., HR Manager, Creative Director"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Create a password"
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Confirm your password"
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                  className="mt-1 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-orange-600 hover:text-orange-700 underline"
                  >
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    onClick={() => setShowPrivacy(true)}
                    className="text-orange-600 hover:text-orange-700 underline"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              <button
                type="submit"
                disabled={state.isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>

        {/* Terms of Service Modal */}
        {showTerms && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
                  <button
                    onClick={() => setShowTerms(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6 text-sm text-gray-700">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">1. Acceptance of Terms</h3>
                  <p>By accessing and using CREA-Match, you accept and agree to be bound by the terms and provision of this agreement.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">2. Use License</h3>
                  <p>Permission is granted to temporarily download one copy of CREA-Match materials for personal, non-commercial transitory viewing only.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">3. User Accounts</h3>
                  <p>Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">4. Content Guidelines</h3>
                  <p>Users must not upload content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">5. Payment Terms</h3>
                  <p>Subscription fees are billed in advance on a monthly or annual basis and are non-refundable except as required by law.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">6. Limitation of Liability</h3>
                  <p>CREA-Match shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Policy Modal */}
        {showPrivacy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
                  <button
                    onClick={() => setShowPrivacy(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6 text-sm text-gray-700">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Information We Collect</h3>
                  <p>We collect information you provide directly to us, such as when you create an account, upload portfolio content, or contact us for support.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">How We Use Your Information</h3>
                  <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Information Sharing</h3>
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Data Security</h3>
                  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Your Rights</h3>
                  <p>You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Contact Us</h3>
                  <p>If you have any questions about this Privacy Policy, please contact us at privacy@crea-match.com.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;