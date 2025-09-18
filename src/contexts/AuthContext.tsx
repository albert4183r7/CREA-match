import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { User, AuthState } from '../types';

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return { 
        ...state, 
        isAuthenticated: true, 
        user: action.payload, 
        isLoading: false 
      };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return { 
        ...state, 
        isAuthenticated: false, 
        user: null, 
        isLoading: false 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        isAuthenticated: false, 
        user: null, 
        isLoading: false 
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, type: 'creative' | 'client') => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
} | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('crea-match-user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('crea-match-user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (!email.includes('@') || password.length < 6) {
        throw new Error('Invalid credentials');
      }

      const user: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        type: email.includes('creative') ? 'creative' : 'client',
        avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1`,
        isVerified: true,
        subscription: 'free',
        joinedAt: new Date()
      };

      localStorage.setItem('crea-match-user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: (error as Error).message });
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string, type: 'creative' | 'client') => {
    dispatch({ type: 'REGISTER_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (!email.includes('@') || password.length < 6) {
        throw new Error('Invalid input');
      }

      const user: User = {
        id: Date.now().toString(),
        name,
        email,
        type,
        avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1`,
        isVerified: false,
        subscription: 'free',
        joinedAt: new Date()
      };

      localStorage.setItem('crea-match-user', JSON.stringify(user));
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: (error as Error).message });
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Date.now().toString(),
        name: 'Google User',
        email: 'user@gmail.com',
        type: 'creative',
        avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1`,
        isVerified: true,
        subscription: 'free',
        joinedAt: new Date()
      };

      localStorage.setItem('crea-match-user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: (error as Error).message });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('crea-match-user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ 
      state, 
      dispatch, 
      login, 
      register, 
      logout, 
      loginWithGoogle 
    }}>
      {children}
    </AuthContext.Provider>
  );
};