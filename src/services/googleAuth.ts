// Google OAuth Integration Service
// This service handles Google authentication using the Google Identity Services API

declare global {
  interface Window {
    google: any;
    googleAuthCallback: (response: any) => void;
  }
}

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  verified_email: boolean;
}

export class GoogleAuthService {
  private static readonly CLIENT_ID = '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com';
  private static isInitialized = false;

  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      // Load Google Identity Services script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: this.CLIENT_ID,
            callback: this.handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });
          this.isInitialized = true;
          resolve();
        } else {
          reject(new Error('Google Identity Services failed to load'));
        }
      };

      script.onerror = () => {
        reject(new Error('Failed to load Google Identity Services'));
      };

      document.head.appendChild(script);
    });
  }

  static async signIn(): Promise<GoogleUser> {
    await this.initialize();

    return new Promise((resolve, reject) => {
      window.googleAuthCallback = (response: any) => {
        try {
          const user = this.parseJWT(response.credential);
          resolve(user);
        } catch (error) {
          reject(error);
        }
      };

      // Show Google One Tap or popup
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback to popup
          window.google.accounts.id.renderButton(
            document.createElement('div'),
            {
              theme: 'outline',
              size: 'large',
              type: 'standard',
              text: 'continue_with',
              shape: 'rectangular',
              logo_alignment: 'left',
            }
          );
        }
      });
    });
  }

  private static handleCredentialResponse = (response: any) => {
    if (window.googleAuthCallback) {
      window.googleAuthCallback(response);
    }
  };

  private static parseJWT(token: string): GoogleUser {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const payload = JSON.parse(jsonPayload);
      
      return {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        verified_email: payload.email_verified,
      };
    } catch (error) {
      throw new Error('Invalid JWT token');
    }
  }

  static signOut(): void {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
  }
}