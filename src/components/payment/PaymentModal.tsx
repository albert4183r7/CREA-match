import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { PaymentService, PaymentMethod, PaymentRequest, PaymentResponse } from '../../services/paymentService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
  userEmail: string;
  userName: string;
  onSuccess: (transactionId: string) => void;
}

const PaymentModal = ({ isOpen, onClose, planName, planPrice, userEmail, userName, onSuccess }: Props) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<PaymentResponse | null>(null);
  const [error, setError] = useState<string>('');

  const paymentMethods = PaymentService.getPaymentMethods();
  const priceNumber = parseInt(planPrice.replace(/[^\d]/g, ''));

  const handlePayment = async () => {
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const request: PaymentRequest = {
        planId: planName.toLowerCase(),
        amount: priceNumber,
        currency: 'IDR',
        paymentMethod: selectedMethod,
        userEmail,
        userName
      };

      const result = await PaymentService.processPayment(request);
      setPaymentResult(result);

      if (result.success) {
        // Simulate payment completion after 3 seconds for demo
        setTimeout(() => {
          onSuccess(result.transactionId);
        }, 3000);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const getMethodIcon = (method: PaymentMethod) => {
    switch (method.type) {
      case 'credit_card':
        return <CreditCard className="w-5 h-5" />;
      case 'e_wallet':
        return <Smartphone className="w-5 h-5" />;
      case 'virtual_account':
        return <Building className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Complete Payment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Payment Success */}
        {paymentResult?.success && (
          <div className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Initiated</h3>
              <p className="text-gray-600 mb-4">Transaction ID: {paymentResult.transactionId}</p>
              
              {paymentResult.virtualAccount && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Virtual Account Number</h4>
                  <p className="text-lg font-mono text-blue-800">{paymentResult.virtualAccount}</p>
                  <p className="text-sm text-blue-600 mt-2">
                    Transfer the exact amount to complete payment
                  </p>
                </div>
              )}

              {paymentResult.paymentUrl && (
                <div className="bg-orange-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-orange-900 mb-2">Complete Payment</h4>
                  <a
                    href={paymentResult.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Open Payment Page
                  </a>
                </div>
              )}

              <div className="flex items-center justify-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                Expires: {paymentResult.expiryTime.toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {/* Payment Form */}
        {!paymentResult && (
          <div className="p-6">
            {/* Plan Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{planName} Plan</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly subscription</span>
                <span className="text-lg font-bold text-gray-900">{formatCurrency(priceNumber)}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Select Payment Method</h4>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedMethod === method.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="text-2xl">{method.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{method.name}</div>
                        <div className="text-sm text-gray-500">
                          {method.processingTime} • Fee: {formatCurrency(method.fee)}
                        </div>
                      </div>
                      {getMethodIcon(method)}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={!selectedMethod || isProcessing}
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? 'Processing...' : `Pay ${formatCurrency(priceNumber)}`}
            </button>

            {/* Security Notice */}
            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 Your payment is secured with 256-bit SSL encryption
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;