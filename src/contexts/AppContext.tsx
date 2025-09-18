import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CreativeProfile, JobOpportunity } from '../types';
import { JobDataService } from '../services/jobDataService';

interface AppState {
  profiles: CreativeProfile[];
  jobs: JobOpportunity[];
  currentView: 'home' | 'upload' | 'jobs' | 'matches' | 'dashboard' | 'login' | 'register' | 'forgot-password' | 'messages';
  isLoading: boolean;
}

type AppAction =
  | { type: 'ADD_PROFILE'; payload: CreativeProfile }
  | { type: 'ADD_JOB'; payload: JobOpportunity }
  | { type: 'SET_VIEW'; payload: AppState['currentView'] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'INIT_SAMPLE_DATA' }
  | { type: 'LOAD_REAL_JOBS'; payload: JobOpportunity[] }

const initialState: AppState = {
  profiles: [],
  jobs: [],
  currentView: 'home',
  isLoading: false
};

const sampleJobs: JobOpportunity[] = [
  {
    id: '1',
    title: 'Brand Identity Design untuk Startup F&B',
    company: 'FoodTech Indonesia',
    description: 'Mencari illustrator/designer untuk membuat brand identity lengkap termasuk logo, color palette, dan brand guidelines untuk startup makanan lokal.',
    requiredSkills: ['Adobe Illustrator', 'Brand Identity', 'Logo Design', 'Typography'],
    budget: 'Rp 15.000.000 - 25.000.000',
    duration: '6 minggu',
    location: 'Jakarta',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    postedBy: 'FoodTech Indonesia',
    createdAt: new Date(),
    embedding: []
  },
  {
    id: '2',
    title: 'Motion Graphics untuk Campaign Digital',
    company: 'Creative Agency XYZ',
    description: 'Dibutuhkan motion editor berpengalaman untuk membuat serangkaian video campaign produk teknologi. Harus mahir After Effects dan memiliki portfolio motion graphics.',
    requiredSkills: ['Adobe After Effects', 'Motion Graphics', 'Video Editing', 'Adobe Premiere'],
    budget: 'Rp 20.000.000 - 30.000.000',
    duration: '8 minggu',
    location: 'Bandung',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    postedBy: 'Creative Agency XYZ',
    createdAt: new Date(),
    embedding: []
  },
  {
    id: '3',
    title: 'Sound Design untuk Game Mobile',
    company: 'Indie Game Studio',
    description: 'Studio game lokal membutuhkan sound designer untuk project game mobile puzzle adventure. Pengalaman dengan game audio dan software DAW diperlukan.',
    requiredSkills: ['Sound Design', 'Game Audio', 'Pro Tools', 'Audio Implementation'],
    budget: 'Rp 12.000.000 - 18.000.000',
    duration: '10 minggu',
    location: 'Yogyakarta',
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    postedBy: 'Indie Game Studio',
    createdAt: new Date(),
    embedding: []
  },
  {
    id: '4',
    title: 'UI/UX Design untuk Platform E-learning',
    company: 'EduTech Solutions',
    description: 'Mencari UI/UX designer untuk redesign platform e-learning dengan fokus pada user experience yang optimal untuk pelajar Indonesia.',
    requiredSkills: ['UI Design', 'UX Research', 'Figma', 'Prototyping', 'User Testing'],
    budget: 'Rp 25.000.000 - 35.000.000',
    duration: '12 minggu',
    location: 'Surabaya',
    deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
    postedBy: 'EduTech Solutions',
    createdAt: new Date(),
    embedding: []
  },
  {
    id: '5',
    title: 'Desain Koleksi Batik Kontemporer',
    company: 'Batik Nusantara',
    description: 'Brand fashion lokal membutuhkan designer batik untuk menciptakan koleksi motif kontemporer yang memadukan tradisi dengan tren modern.',
    requiredSkills: ['Batik Design', 'Pattern Design', 'Traditional Arts', 'Fashion Design'],
    budget: 'Rp 18.000.000 - 28.000.000',
    duration: '14 minggu',
    location: 'Solo',
    deadline: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000),
    postedBy: 'Batik Nusantara',
    createdAt: new Date(),
    embedding: []
  }
];

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_PROFILE':
      return { ...state, profiles: [...state.profiles, action.payload] };
    case 'ADD_JOB':
      return { ...state, jobs: [...state.jobs, action.payload] };
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'INIT_SAMPLE_DATA':
      return { ...state, jobs: sampleJobs };
    case 'LOAD_REAL_JOBS':
      return { ...state, jobs: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load real jobs on app initialization
  React.useEffect(() => {
    const loadRealJobs = async () => {
      try {
        const realJobs = await JobDataService.fetchRealJobs();
        const convertedJobs: JobOpportunity[] = realJobs.map(job => ({
          id: job.id,
          title: job.title,
          company: job.company,
          description: job.description,
          requiredSkills: job.requiredSkills,
          budget: job.budget,
          duration: job.duration,
          location: job.location,
          deadline: job.deadline,
          postedBy: job.postedBy,
          createdAt: job.createdAt,
          embedding: job.embedding
        }));
        dispatch({ type: 'LOAD_REAL_JOBS', payload: convertedJobs });
      } catch (error) {
        console.error('Failed to load real jobs:', error);
        // Fallback to sample data
        dispatch({ type: 'INIT_SAMPLE_DATA' });
      }
    };

    loadRealJobs();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};