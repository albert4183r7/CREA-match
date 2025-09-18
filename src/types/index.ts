export interface CreativeProfession {
  id: string;
  name: string;
  category: 'visual' | 'audio' | 'digital' | 'traditional' | 'multimedia';
  description: string;
}

export interface CreativeProfile {
  id: string;
  name: string;
  email: string;
  profession: string;
  confidence: number;
  skills: string[];
  portfolio: string;
  generatedBio: string;
  tags: string[];
  sampleProjects: string[];
  location: string;
  availability: 'immediate' | 'within_week' | 'within_month' | 'busy';
  rateRange: string;
  createdAt: Date;
  embedding?: number[];
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  description: string;
  requiredSkills: string[];
  budget: string;
  duration: string;
  location: string;
  deadline: Date;
  postedBy: string;
  createdAt: Date;
  source?: string;
  sourceUrl?: string;
  isVerified?: boolean;
  applicationCount?: number;
  embedding?: number[];
}

export interface MatchResult {
  profile: CreativeProfile;
  job: JobOpportunity;
  score: number;
  reasons: MatchReason[];
}

export interface MatchReason {
  type: 'semantic_similarity' | 'skill_overlap' | 'availability' | 'location' | 'experience';
  value: number;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'creative' | 'client';
  profile?: CreativeProfile;
  avatar?: string;
  isVerified?: boolean;
  subscription?: 'free' | 'pro' | 'enterprise';
  joinedAt?: Date;
  profession?: string;
  companyName?: string;
  industry?: string;
  position?: string;
  profession?: string;
  companyName?: string;
  industry?: string;
  position?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  updatedAt: Date;
  unreadCount: number;
}