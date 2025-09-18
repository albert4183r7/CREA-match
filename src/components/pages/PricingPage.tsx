import React from 'react';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const PricingPage = () => {
  const { dispatch } = useApp();

  const plans = [
    {
      name: 'Free',
      price: 'Rp 0',
      period: '/bulan',
      description: 'Perfect untuk memulai journey kreatif Anda',
      icon: Star,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      features: [
        'Upload 3 portfolio per bulan',
        'Apply ke 10 proyek per bulan',
        'Basic profile visibility',
        'Email support',
        'Community access'
      ],
      limitations: [
        'Tidak ada priority matching',
        'Tidak ada advanced analytics',
        'Tidak ada direct messaging'
      ]
    },
    {
      name: 'Pro',
      price: 'Rp 99.000',
      period: '/bulan',
      description: 'Untuk creative professional yang serius',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      buttonColor: 'bg-orange-600 hover:bg-orange-700',
      popular: true,
      features: [
        'Unlimited portfolio uploads',
        'Unlimited project applications',
        'Priority matching algorithm',
        'Advanced profile analytics',
        'Direct messaging dengan clients',
        'Portfolio optimization tips',
        'Priority customer support',
        'Featured profile placement'
      ],
      limitations: []
    },
    {
      name: 'Enterprise',
      price: 'Rp 299.000',
      period: '/bulan',
      description: 'Untuk agencies dan perusahaan besar',
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      features: [
        'Semua fitur Pro',
        'Team collaboration tools',
        'Bulk project posting',
        'Advanced talent search filters',
        'Custom branding',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'White-label solutions'
      ],
      limitations: []
    }
  ];

  const handleStartTrial = (planName: string) => {
    alert(`Starting ${planName} trial - Feature akan segera tersedia!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan kreatif Anda. 
            Semua paket dilengkapi dengan AI-powered matching dan analytics.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border-2 ${plan.borderColor} overflow-hidden ${
                  plan.popular ? 'transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className={`${plan.bgColor} px-6 py-8 ${plan.popular ? 'pt-12' : ''}`}>
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${plan.color} bg-white shadow-sm`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  </div>
                </div>

                <div className="px-6 py-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, limitIndex) => (
                      <li key={limitIndex} className="flex items-start space-x-3 opacity-50">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                          <div className="w-3 h-3 bg-gray-300 rounded-full mx-auto mt-1"></div>
                        </div>
                        <span className="text-gray-500 text-sm line-through">{limitation}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleStartTrial(plan.name)}
                    className={`w-full ${plan.buttonColor} text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2`}
                  >
                    <span>{plan.name === 'Free' ? 'Get Started' : 'Start Free Trial'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  {plan.name !== 'Free' && (
                    <p className="text-center text-xs text-gray-500 mt-2">
                      14 hari gratis, cancel kapan saja
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Apakah saya bisa upgrade atau downgrade kapan saja?
              </h3>
              <p className="text-gray-600 text-sm">
                Ya, Anda bisa mengubah paket kapan saja. Perubahan akan berlaku pada billing cycle berikutnya.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Bagaimana cara kerja free trial?
              </h3>
              <p className="text-gray-600 text-sm">
                Free trial berlaku 14 hari dengan akses penuh ke semua fitur. Tidak ada biaya tersembunyi.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Apakah data saya aman?
              </h3>
              <p className="text-gray-600 text-sm">
                Kami menggunakan enkripsi tingkat enterprise dan mematuhi standar keamanan internasional.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Bagaimana sistem pembayaran?
              </h3>
              <p className="text-gray-600 text-sm">
                Kami menerima berbagai metode pembayaran termasuk kartu kredit, transfer bank, dan e-wallet.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Masih ada pertanyaan?
          </h2>
          <p className="text-gray-600 mb-8">
            Tim kami siap membantu Anda memilih paket yang tepat
          </p>
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'contact' })}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            Contact Sales
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;