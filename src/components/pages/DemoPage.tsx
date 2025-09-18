import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize, CheckCircle, ArrowRight, Brain, Zap, Target } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const DemoPage = () => {
  const { dispatch } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: 'Upload Portfolio',
      description: 'Creative professional mengupload portfolio dan deskripsi keahlian mereka',
      duration: '0:00 - 0:30',
      features: ['AI Classification', 'Skill Extraction', 'Metadata Generation']
    },
    {
      title: 'AI Processing',
      description: 'AWS Bedrock menganalisis dan mengklasifikasi profesi secara otomatis',
      duration: '0:30 - 1:00',
      features: ['Profession Mapping', 'Confidence Scoring', 'Tag Generation']
    },
    {
      title: 'Smart Matching',
      description: 'Sistem mencocokkan creative dengan proyek menggunakan semantic search',
      duration: '1:00 - 1:30',
      features: ['Semantic Similarity', 'Skill Matching', 'Explainable AI']
    },
    {
      title: 'Connect & Collaborate',
      description: 'Client dan creative terhubung untuk memulai kolaborasi',
      duration: '1:30 - 2:00',
      features: ['Direct Messaging', 'Project Management', 'Success Tracking']
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: 'AI-Powered Classification',
      description: 'Otomatis mengidentifikasi profesi kreatif dengan akurasi tinggi'
    },
    {
      icon: Zap,
      title: 'Smart Matching Algorithm',
      description: 'Mencocokkan talent dengan proyek berdasarkan semantic similarity'
    },
    {
      icon: Target,
      title: 'Explainable Results',
      description: 'Memberikan alasan yang jelas mengapa suatu match direkomendasikan'
    }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const handleStartTrial = () => {
    dispatch({ type: 'SET_VIEW', payload: 'register' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            See CREA-Match in Action
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our AI-powered platform revolutionizes the way creative professionals 
            connect with opportunities in Indonesia's creative economy.
          </p>
        </div>

        {/* Video Demo Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-16">
          <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 relative">
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
                  <button
                    onClick={handlePlayPause}
                    className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  CREA-Match Platform Demo
                </h3>
                <p className="text-gray-300">
                  Watch how AI transforms creative talent discovery
                </p>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <button onClick={handlePlayPause}>
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>
                    <Volume2 className="w-5 h-5" />
                    <span className="text-sm">2:00</span>
                  </div>
                  <button>
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-2 bg-gray-600 rounded-full h-1">
                  <div className="bg-orange-500 h-1 rounded-full w-1/3"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Steps */}
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Demo Walkthrough</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {demoSteps.map((step, index) => (
                <div
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    currentStep === index
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep === index
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-xs text-gray-500">{step.duration}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                  <div className="space-y-1">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose CREA-Match?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-xl mb-6">
                    <IconComponent className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-16 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Platform Performance</h2>
            <p className="text-orange-100">Real results from our AI-powered matching system</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-orange-100">Classification Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">3.2s</div>
              <div className="text-orange-100">Average Processing Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">87%</div>
              <div className="text-orange-100">Match Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2.5k+</div>
              <div className="text-orange-100">Active Users</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Creative Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of creative professionals who have already discovered 
            their perfect projects through CREA-Match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartTrial}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'contact' })}
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-colors"
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;