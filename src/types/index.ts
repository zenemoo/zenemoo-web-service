export interface ApiResponse<T = any> {
  success?: boolean;
  status?: string;
  service?: string;
  timestamp?: string;
  data?: T;
  datasets?: T;
  count?: number;
  message?: string;
  error?: string;
  code?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  features?: string[];
  category?: string;
  estimatedTurnaround?: string;
  recommendedFor?: string;
}

export interface DatasetItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category?: string;
  language?: string;
  totalHours?: number;
  speakersCount?: number;
  sampleRate?: string;
  format?: string;
  license?: string;
  downloadsCount?: number;
  created_at?: string;
  tags?: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image_url?: string;
  description: string;
  metrics?: Record<string, string>;
  tags?: string[];
  clientSector?: string;
}

export interface TeamMember {
  id: string;
  position?: number;
  name: string;
  designation: string;
  department: string;
  avatar?: string;
  bio?: string;
  linkedin?: string;
  github?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  language?: string;
  message: string;
  inquiry_code?: string;
}

export interface HealthTelemetry {
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  service: string;
  timestamp: string;
  latencyMs?: number;
  version?: string;
  region?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'enterprise_user' | 'client';
  company?: string;
  apiKey?: string;
}
