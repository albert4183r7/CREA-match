// Payment Service Integration
// Supports multiple payment methods for Indonesian market

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'bank_transfer' | 'e_wallet' | 'credit_card' | 'virtual_account';
  icon: string;
  fee: number;
  processingTime: string;
}

export interface PaymentRequest {
  planId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  userEmail: string;
  userName: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  paymentUrl?: string;
  virtualAccount?: string;
  qrCode?: string;
  expiryTime: Date;
}

export class PaymentService {
  private static readonly PAYMENT_METHODS: PaymentMethod[] = [
    {
      id: 'bca_va',
      name: 'BCA Virtual Account',
      type: 'virtual_account',
      icon: '🏦',
      fee: 4000,
      processingTime: 'Instant'
    },
    {
      id: 'mandiri_va',
      name: 'Mandiri Virtual Account',
      type: 'virtual_account',
      icon: '🏦',
      fee: 4000,
      processingTime: 'Instant'
    },
    {
      id: 'bni_va',
      name: 'BNI Virtual Account',
      type: 'virtual_account',
      icon: '🏦',
      fee: 4000,
      processingTime: 'Instant'
    },
    {
      id: 'gopay',
      name: 'GoPay',
      type: 'e_wallet',
      icon: '💚',
      fee: 0,
      processingTime: 'Instant'
    },
    {
      id: 'ovo',
      name: 'OVO',
      type: 'e_wallet',
      icon: '💜',
      fee: 0,
      processingTime: 'Instant'
    },
    {
      id: 'dana',
      name: 'DANA',
      type: 'e_wallet',
      icon: '💙',
      fee: 0,
      processingTime: 'Instant'
    },
    {
      id: 'shopeepay',
      name: 'ShopeePay',
      type: 'e_wallet',
      icon: '🧡',
      fee: 0,
      processingTime: 'Instant'
    },
    {
      id: 'credit_card',
      name: 'Credit/Debit Card',
      type: 'credit_card',
      icon: '💳',
      fee: 0,
      processingTime: 'Instant'
    }
  ];

  static getPaymentMethods(): PaymentMethod[] {
    return this.PAYMENT_METHODS;
  }

  static async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    // Simulate payment processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const method = this.PAYMENT_METHODS.find(m => m.id === request.paymentMethod);
    if (!method) {
      throw new Error('Invalid payment method');
    }

    // Generate realistic transaction ID
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    // Simulate different payment flows
    switch (method.type) {
      case 'virtual_account':
        return {
          success: true,
          transactionId,
          virtualAccount: this.generateVirtualAccount(method.id),
          expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        };
      
      case 'e_wallet':
        return {
          success: true,
          transactionId,
          paymentUrl: `https://payment.${method.id}.com/pay/${transactionId}`,
          qrCode: `data:image/svg+xml;base64,${btoa(this.generateQRCode(transactionId))}`,
          expiryTime: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
        };
      
      case 'credit_card':
        return {
          success: true,
          transactionId,
          paymentUrl: `https://secure-payment.gateway.com/pay/${transactionId}`,
          expiryTime: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
        };
      
      default:
        throw new Error('Unsupported payment method');
    }
  }

  private static generateVirtualAccount(methodId: string): string {
    const bankCodes = {
      'bca_va': '014',
      'mandiri_va': '008',
      'bni_va': '009'
    };
    
    const bankCode = bankCodes[methodId as keyof typeof bankCodes] || '014';
    const accountNumber = Math.random().toString().substr(2, 10);
    return `${bankCode}${accountNumber}`;
  }

  private static generateQRCode(transactionId: string): string {
    // Simple SVG QR code placeholder
    return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="white"/>
      <rect x="20" y="20" width="160" height="160" fill="black"/>
      <rect x="40" y="40" width="120" height="120" fill="white"/>
      <text x="100" y="105" text-anchor="middle" font-size="12" fill="black">QR Code</text>
      <text x="100" y="125" text-anchor="middle" font-size="8" fill="black">${transactionId}</text>
    </svg>`;
  }

  static async verifyPayment(transactionId: string): Promise<boolean> {
    // Simulate payment verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 90% success rate for demo
    return Math.random() > 0.1;
  }
}