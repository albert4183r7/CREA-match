// Email Service for sending contact messages
// This service handles email sending functionality

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: Date;
}

export class EmailService {
  private static readonly CONTACT_EMAIL = 'hello@crea-match.com';
  private static readonly API_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
  
  // EmailJS configuration (you would need to set up EmailJS account)
  private static readonly SERVICE_ID = 'service_creamatch';
  private static readonly TEMPLATE_ID = 'template_contact';
  private static readonly PUBLIC_KEY = 'your_emailjs_public_key';

  static async sendContactMessage(contactData: ContactMessage): Promise<boolean> {
    try {
      // Validate email format
      if (!this.isValidEmail(contactData.email)) {
        throw new Error('Invalid email format');
      }

      // In a real implementation, you would use EmailJS or similar service
      // For demo purposes, we'll simulate the email sending
      const emailData = {
        service_id: this.SERVICE_ID,
        template_id: this.TEMPLATE_ID,
        user_id: this.PUBLIC_KEY,
        template_params: {
          from_name: contactData.name,
          from_email: contactData.email,
          to_email: this.CONTACT_EMAIL,
          subject: contactData.subject,
          message: contactData.message,
          reply_to: contactData.email,
        },
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In production, you would make actual API call:
      // const response = await fetch(this.API_ENDPOINT, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(emailData),
      // });

      // For demo, we'll log the message and return success
      console.log('Contact message sent:', {
        to: this.CONTACT_EMAIL,
        from: contactData.email,
        subject: contactData.subject,
        message: contactData.message,
        timestamp: contactData.timestamp,
      });

      // Store message in localStorage for demo purposes
      this.storeMessage(contactData);

      return true;
    } catch (error) {
      console.error('Failed to send contact message:', error);
      throw error;
    }
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static storeMessage(message: ContactMessage): void {
    try {
      const existingMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      existingMessages.push(message);
      localStorage.setItem('contact_messages', JSON.stringify(existingMessages));
    } catch (error) {
      console.error('Failed to store message locally:', error);
    }
  }

  static getStoredMessages(): ContactMessage[] {
    try {
      return JSON.parse(localStorage.getItem('contact_messages') || '[]');
    } catch (error) {
      console.error('Failed to retrieve stored messages:', error);
      return [];
    }
  }

  // Email validation for registration
  static async validateEmailExists(email: string): Promise<boolean> {
    try {
      // In production, you would use an email validation service
      // For demo, we'll do basic format validation and simulate API check
      if (!this.isValidEmail(email)) {
        return false;
      }

      // Simulate API call to email validation service
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo, we'll accept most common email domains
      const commonDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
        'company.com', 'example.com', 'test.com'
      ];

      const domain = email.split('@')[1];
      return commonDomains.some(d => domain.includes(d.split('.')[0]));
    } catch (error) {
      console.error('Email validation failed:', error);
      return false;
    }
  }
}