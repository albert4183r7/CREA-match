import React, { useEffect } from 'react';
import { Sparkles, Users, Briefcase, Target, ArrowRight, CheckCircle, Brain, Zap, Globe, Play, Pause, Volume2, VolumeX, Maximize, ChevronDown, Mail, Phone, MapPin, Send, Star, Crown } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import PaymentModal from './payment/PaymentModal';

const HomePage = () => {
  const { state, dispatch } = useApp();
  const { state: authState } = useAuth();
  const { user } = authState;
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<any>(null);
  const [contactForm, setContactForm] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmittingContact, setIsSubmittingContact] = React.useState(false);
  const [showContactSuccess, setShowContactSuccess] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Initialize sample data
    dispatch({ type: 'INIT_SAMPLE_DATA' });
  }, [dispatch]);

  const handleGetStarted = () => {
    if (user) {
      if (user.type === 'creative') {
        dispatch({ type: 'SET_VIEW', payload: 'upload' });
      } else {
        dispatch({ type: 'SET_VIEW', payload: 'jobs' });
      }
    } else {
      dispatch({ type: 'SET_VIEW', payload: 'register' });
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmittingContact(false);
    setShowContactSuccess(true);
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const stats = [
    { label: 'Creative Professionals', value: '2,500+', icon: Users },
    { label: 'Active Projects', value: '150+', icon: Briefcase },
    { label: 'Successful Matches', value: '1,200+', icon: Target }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Classification',
      description: 'Automatically classify creative professions from portfolios using AWS Bedrock',
      color: 'text-blue-500'
    },
    {
      icon: Zap,
      title: 'Smart Matching',
      description: 'Semantic search algorithm to match talent with the right projects',
      color: 'text-orange-500'
    },
    {
      icon: Globe,
      title: 'Fokus Ekraf Indonesia',
      description: 'Special taxonomy for Indonesian creative professions and local culture',
      color: 'text-teal-500'
    }
  ];

  const professions = [
    'Illustrator', 'Motion Editor', 'UI/UX Designer', 'Sound Designer',
    'Batik Designer', 'VFX Artist', 'Concept Artist', 'Animator'
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: 'Rp 0',
      period: '/month',
      popular: false,
      icon: Star,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      features: {
        portfolios: '3',
        applications: '10',
        matching: 'Basic',
        analytics: false,
        messaging: false,
        support: 'Email',
        featured: false
      }
    },
    {
      name: 'Pro',
      price: 'Rp 99.000',
      period: '/month',
      popular: true,
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      buttonColor: 'bg-orange-600 hover:bg-orange-700',
      features: {
        portfolios: 'Unlimited',
        applications: 'Unlimited',
        matching: 'Priority',
        analytics: true,
        messaging: true,
        support: 'Priority',
        featured: true
      }
    },
    {
      name: 'Business',
      price: 'Rp 199.000',
      period: '/month',
      popular: false,
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      features: {
        portfolios: 'Unlimited',
        applications: 'Unlimited',
        matching: 'Advanced',
        analytics: true,
        messaging: true,
        support: 'Priority',
        featured: true
      }
    },
    {
      name: 'Enterprise',
      price: 'Rp 299.000',
      period: '/month',
      popular: false,
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      features: {
        portfolios: 'Unlimited',
        applications: 'Unlimited',
        matching: 'Advanced',
        analytics: true,
        messaging: true,
        support: 'Dedicated',
        featured: true
      }
    }
  ];

  const faqData = [
    {
      question: 'How does CREA-Match work?',
      answer: 'CREA-Match uses AI to automatically classify your creative profession from your portfolio, generates relevant metadata, and matches you with suitable projects using semantic search technology.'
    },
    {
      question: 'What types of creative professions are supported?',
      answer: 'We support a wide range of creative professions including illustrators, motion editors, UI/UX designers, sound designers, batik designers, VFX artists, concept artists, animators, and many more.'
    },
    {
      question: 'Is my portfolio data secure?',
      answer: 'Yes, we use enterprise-grade encryption and follow international security standards to protect your data. Your portfolio information is never shared without your consent.'
    },
    {
      question: 'How accurate is the AI classification?',
      answer: 'Our AI classification system has a 95% accuracy rate, powered by AWS Bedrock and trained specifically for Indonesian creative professions.'
    },
    {
      question: 'Can I upgrade or downgrade my plan anytime?',
      answer: 'Yes, you can change your subscription plan at any time. Changes will take effect on your next billing cycle.'
    },
    {
      question: 'Do you offer a free trial?',
      answer: 'Yes, we offer a 14-day free trial for all paid plans with full access to all features.'
    },
    {
      question: 'How does the matching algorithm work?',
      answer: 'Our matching algorithm combines semantic similarity, skill overlap, availability, and location factors to provide explainable match scores between creatives and projects.'
    },
    {
      question: 'Can I contact matched creatives directly?',
      answer: 'Yes, Pro and Enterprise users can use our built-in messaging system to communicate directly with matched creatives or project owners.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including Indonesian bank transfers (BCA, Mandiri, BNI), e-wallets (GoPay, OVO, DANA, ShopeePay), and international credit/debit cards.'
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription anytime from your dashboard. Your access will continue until the end of your current billing period.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Currently, CREA-Match is available as a responsive web application. A dedicated mobile app is planned for future release.'
    },
    {
      question: 'How do you ensure job posting quality?',
      answer: 'All job postings are verified and sourced from reputable platforms like JobStreet, Kalibrr, Glints, and LinkedIn to ensure authenticity and quality.'
    }
  ];

  const handleStartTrial = (plan: any) => {
    if (plan.name === 'Free') {
      handleGetStarted();
    } else {
      setSelectedPlan(plan);
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = (transactionId: string) => {
    setShowPaymentModal(false);
    setSelectedPlan(null);
    alert(`Payment successful! Transaction ID: ${transactionId}`);
    // Here you would typically update the user's subscription status
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-blue-50 opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto pb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Smart Matching for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600 pb-2">
                Indonesia's Creative Economy
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              AI-powered platform that connects creative talent with project opportunities through 
              automatic profession mapping, metadata enrichment, dan semantic matching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                    <IconComponent className="w-8 h-8 text-orange-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              See CREA-Match in Action
            </h2>
            <p className="text-lg text-gray-600">
              Watch how our AI transforms creative talent discovery
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 relative">
              {/* Video Player */}
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&dpr=1"
                  muted
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onClick={togglePlayPause}
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video Overlay */}
                {!isVideoPlaying && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">CREA-Match Platform Demo</h3>
                      <p className="text-gray-200 mb-6">Watch how AI transforms creative talent discovery</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Video Controls Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlayPause}
                  className="w-20 h-20 bg-orange-500 bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                >
                  {isVideoPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>
              </div>
              
              {/* Video Controls Bar */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-3">
                      <button onClick={togglePlayPause}>
                        {isVideoPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </button>
                      <button onClick={toggleMute}>
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                      <span className="text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>
                    <button onClick={toggleFullscreen}>
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-2 bg-gray-600 rounded-full h-1 cursor-pointer" onClick={handleProgressClick}>
                    <div 
                      className="bg-orange-500 h-1 rounded-full transition-all" 
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              CREA-Match Key Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced AI technology to connect Indonesia's creative ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${feature.color} bg-opacity-10`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Professions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Supported Creative Professions
            </h2>
            <p className="text-lg text-gray-600">
              Special taxonomy for Indonesia's creative ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {professions.map((profession, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl border border-gray-100 hover:shadow-md transition-all hover:scale-105">
                <span className="text-sm font-medium text-gray-800 text-center">{profession}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pricing Table */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-8 border-b border-gray-200 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing Plans</h2>
              <p className="text-lg text-gray-600">Choose the plan that fits your needs</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-8 py-6 text-left text-base font-semibold text-gray-900 w-1/3">Features</th>
                    {pricingPlans.map((plan, index) => (
                      <th key={index} className="px-6 py-6 text-center relative w-1/6">
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              Most Popular
                            </span>
                          </div>
                        )}
                        <div className={`text-xl font-bold ${plan.popular ? 'text-orange-600 mt-4' : 'text-gray-900'}`}>
                          {plan.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-gray-50">
                    <td className="px-8 py-4 text-base font-semibold text-gray-900">Monthly Credits</td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">100</td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">1,000</td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">5,000</td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-4 text-sm font-medium text-gray-900">Portfolio Uploads</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">3</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Unlimited</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Unlimited</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-4 text-sm font-medium text-gray-900">AI-Powered Matching</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-8 py-4 text-sm font-medium text-gray-900">Priority Support</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-400">-</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-8 py-4 text-sm font-medium text-gray-900">Advanced Analytics</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-400">-</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-8 py-4 text-sm font-medium text-gray-900">API Access</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-400">-</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-400">-</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-8 py-4 text-sm font-medium text-gray-900">Custom Integrations</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-400">-</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-400">-</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-400">-</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="bg-gradient-to-r from-orange-50 to-blue-50 border-t-2 border-orange-200">
                    <td className="px-8 py-6 text-lg font-bold text-gray-900">Monthly Price</td>
                    {pricingPlans.map((plan, index) => (
                      <td key={index} className="px-6 py-6 text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {plan.price}
                        </div>
                        <div className="text-sm text-gray-500">{plan.period}</div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-8 py-6"></td>
                    {pricingPlans.map((plan, index) => (
                      <td key={index} className="px-6 py-6 text-center">
                        <button
                          onClick={() => handleStartTrial(plan)}
                          className={`px-8 py-3 rounded-lg font-semibold transition-colors text-sm ${
                            plan.popular
                              ? 'bg-orange-500 text-white hover:bg-orange-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {plan.name === 'Free' ? 'Get Started' : 'Start Free Trial'}
                        </button>
                        {plan.name !== 'Free' && (
                          <p className="text-xs text-gray-500 mt-2">14 days free trial</p>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about CREA-Match
            </p>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`} />
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600">
              Have a question, partnership inquiry, or want to learn more? Fill out the form and our team will get back to you within 1 business day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <p className="text-gray-600 mb-8">Our team is ready to assist you with any inquiries. We'll respond promptly.</p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                    <Mail className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">hello@crea-match.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">LinkedIn</h4>
                    <p className="text-gray-600">linkedin.com/company/crea-match</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-teal-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Office</h4>
                    <p className="text-gray-600">Jakarta, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your message here"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="w-full flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {isSubmittingContact ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join the Creative Ecosystem?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your creative journey and discover unlimited opportunities with CREA-Match
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Get Started Today
          </button>
        </div>
      </section>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && user && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
          userEmail={user.email}
          userName={user.name}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Contact Success Modal */}
      {showContactSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. Our team will get back to you within 1 business day.
            </p>
            <button
              onClick={() => setShowContactSuccess(false)}
              className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;