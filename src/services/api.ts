import { 
  ApiResponse, 
  ServiceItem, 
  DatasetItem, 
  PortfolioItem, 
  TeamMember, 
  ContactSubmission, 
  HealthTelemetry,
  UserProfile 
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://zenemootech-api.onrender.com';

class ApiService {
  private getHeaders(token?: string | null): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const authToken = token || localStorage.getItem('zenemoo_auth_token');
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL.replace(/\/$/, '')}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          success: false,
          status: response.status.toString(),
          message: responseData.message || responseData.error || `Server responded with status ${response.status}`,
          code: responseData.code || `HTTP_${response.status}`,
        };
      }

      return responseData;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return {
          success: false,
          status: 'TIMEOUT',
          message: 'Request timed out while contacting Zenemoo API services. Please try again.',
        };
      }

      return {
        success: false,
        status: 'NETWORK_ERROR',
        message: err.message || 'Unable to connect to Zenemoo backend services.',
      };
    }
  }

  // --- Health Telemetry ---
  async getHealthStatus(): Promise<{ telemetry: HealthTelemetry; latencyMs: number }> {
    const startTime = performance.now();
    const res = await this.request<HealthTelemetry>('/health');
    const endTime = performance.now();
    const latencyMs = Math.round(endTime - startTime);

    if (res.status === 'ONLINE' || res.success || res.service) {
      return {
        telemetry: {
          status: 'ONLINE',
          service: res.service || 'ZENEMOO Data Solutions API Server',
          timestamp: res.timestamp || new Date().toISOString(),
          latencyMs,
          version: 'v2.4.0',
          region: 'asia-south1 (Render Cloud)',
        },
        latencyMs,
      };
    }

    return {
      telemetry: {
        status: 'DEGRADED',
        service: 'ZENEMOO Data Solutions API Server',
        timestamp: new Date().toISOString(),
        latencyMs,
        version: 'v2.4.0',
        region: 'asia-south1 (Render Cloud)',
      },
      latencyMs,
    };
  }

  // --- Services ---
  async getServices(): Promise<ServiceItem[]> {
    const res = await this.request<ServiceItem[]>('/api/services');
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }

    // Enterprise Fallback Data matching Zenemoo Data Solutions specs
    return [
      {
        id: '1',
        title: 'Audio Transcription & Segmentation',
        subtitle: 'Clean Verbatim & Precise Timestamps',
        description: 'Multi-speaker speech-to-text transcription with speaker identification, acoustic noise taggings, and strict guideline alignment for AI model training.',
        features: ['Clean & Strict Verbatim options', 'Millisecond-accurate timestamps', 'Multi-dialect & accented speaker handling', '99.4% accuracy benchmark'],
        category: 'Speech AI',
        estimatedTurnaround: '24-48 Hours',
        recommendedFor: 'ASR Model Training & Voice Assistant Fine-tuning'
      },
      {
        id: '2',
        title: 'Multilingual Dataset Collection',
        subtitle: 'Indic & Regional Language Corpora',
        description: 'Custom field audio, video, and text data collection across 22+ regional Indian and South Asian languages with verified demographic diversity.',
        features: ['In-field microphone diversity', 'Balanced age/gender demographics', 'Linguistic expert verification', 'GDPR & Ethics Compliant'],
        category: 'Data Collection',
        estimatedTurnaround: '3-7 Days',
        recommendedFor: 'Regional Language LLMs & Speech Corpora'
      },
      {
        id: '3',
        title: 'Computer Vision & Video Annotation',
        subtitle: 'Bounding Boxes, Polygons & Tracking',
        description: 'High-precision video frame annotation, action recognition tagging, object tracking, and facial keypoint labeling for autonomous and CV models.',
        features: ['Pixel-level segmentation masks', 'Multi-frame object tracking', 'Synthetic & real video pipelines', 'QC error rate < 0.2%'],
        category: 'Computer Vision',
        estimatedTurnaround: '48 Hours',
        recommendedFor: 'Autonomous Vision & Security AI'
      },
      {
        id: '4',
        title: 'LLM RLHF & Text Annotation',
        subtitle: 'Human Feedback & Quality Scoring',
        description: 'Reinforcement Learning from Human Feedback (RLHF), red-teaming, prompt engineering datasets, and domain-specific expert evaluations.',
        features: ['Domain expert annotators (STEM, Medical, Legal)', 'Pairwise preference ranking', 'Safety & toxicity red-teaming', 'Structured JSON output'],
        category: 'NLP & LLM',
        estimatedTurnaround: '3-5 Days',
        recommendedFor: 'Generative AI & Enterprise LLMs'
      }
    ];
  }

  // --- Datasets ---
  async getDatasets(): Promise<DatasetItem[]> {
    const res = await this.request<any>('/api/datasets');
    if (res.success && Array.isArray(res.datasets) && res.datasets.length > 0) {
      return res.datasets;
    }
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }

    // Enterprise Datasets Fallback
    return [
      {
        id: 'ds-01',
        name: 'West Bengal & Bihar Regional Speech Video Dataset',
        slug: 'west-bengal-bihar-videos-mt0eh7z1',
        description: 'Comprehensive conversational video & audio collection from West Bengal & Bihar spanning rural and urban dialects with detailed acoustic metadata.',
        category: 'Speech & Video AI',
        language: 'Bengali / Hindi / Maithili',
        totalHours: 120,
        speakersCount: 450,
        sampleRate: '48kHz 24-bit PCM / 1080p Video',
        format: 'WAV + MP4 + JSON Transcripts',
        license: 'Enterprise Commercial AI License',
        downloadsCount: 380,
        tags: ['Speech', 'Conversational', 'Regional Dialects', 'Video']
      },
      {
        id: 'ds-02',
        name: 'Indic Multi-Speaker Clean Verbatim Speech Corpus',
        slug: 'indic-multi-speaker-verbatim-speech',
        description: 'Studio and field recorded multi-speaker speech dataset with phonetic transcriptions, disfluency tags, and timestamp alignment.',
        category: 'Speech AI',
        language: 'Hindi / Tamil / Telugu / Bengali / English',
        totalHours: 450,
        speakersCount: 1200,
        sampleRate: '48kHz 16-bit WAV',
        format: 'FLAC + VTT + JSON',
        license: 'Enterprise Commercial AI License',
        downloadsCount: 890,
        tags: ['ASR', 'Clean Verbatim', 'Indic Languages']
      },
      {
        id: 'ds-03',
        name: 'Enterprise Document OCR & Layout Intelligence Dataset',
        slug: 'enterprise-ocr-layout-intelligence',
        description: 'High-density scanned business invoices, receipts, and multilingual forms annotated with cell boundaries and key-value pairings.',
        category: 'Computer Vision',
        language: 'English / Hindi',
        totalHours: 0,
        speakersCount: 0,
        sampleRate: '300 DPI Images',
        format: 'JSON + COCO Bounding Boxes',
        license: 'Enterprise Commercial AI License',
        downloadsCount: 540,
        tags: ['OCR', 'Document AI', 'Bounding Boxes']
      }
    ];
  }

  // --- Portfolio ---
  async getPortfolio(): Promise<PortfolioItem[]> {
    const res = await this.request<PortfolioItem[]>('/api/portfolio');
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }

    return [
      {
        id: '1',
        title: 'DesiCrew Multilingual Speech Dataset Pipeline',
        category: 'Speech AI',
        description: 'Processed 3,600+ minutes of timestamped verbatim Hindi, Bengali, and English conversational speech for enterprise Speech AI models.',
        metrics: {
          'Total Duration': '3,600+ Mins',
          'Accuracy': '99.6%',
          'Speakers': '850+ Unique',
          'Turnaround': '12 Days'
        },
        tags: ['Speech-to-Text', 'Multi-Speaker', 'Timestamping'],
        clientSector: 'Global AI Research Institute'
      },
      {
        id: '2',
        title: 'Healthcare AI Medical Report OCR & Entity Extraction',
        category: 'NLP & OCR',
        description: 'Annotated over 50,000+ anonymized clinical notes and lab reports with structured medical NER tags and relation graphs.',
        metrics: {
          'Documents Processed': '50,000+',
          'Entities Tagged': '420,000+',
          'F1 Score': '0.985'
        },
        tags: ['Medical NER', 'Document Parsing', 'Privacy Preserved'],
        clientSector: 'Enterprise Health Tech'
      },
      {
        id: '3',
        title: 'Urban Traffic & Pedestrian Video Tracking Corpus',
        category: 'Computer Vision',
        description: 'Frame-by-frame 4K video segmentation and bounding box labeling across 12 weather conditions for autonomous mobility training.',
        metrics: {
          'Annotated Frames': '250,000+',
          'Object Classes': '18 Types',
          'Delivery Speed': '15k Frames/Day'
        },
        tags: ['Object Tracking', 'Segmentation', '4K Video'],
        clientSector: 'Autonomous Systems Corp'
      }
    ];
  }

  // --- Team ---
  async getTeam(): Promise<TeamMember[]> {
    const res = await this.request<TeamMember[]>('/api/team');
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }

    return [
      {
        id: '1',
        name: 'Prem Prasad Pradhan',
        designation: 'Founder & Managing Director',
        department: 'Leadership',
        bio: 'Driving enterprise AI data engineering, dataset collection strategies, and scalable human-in-the-loop pipelines.',
        linkedin: 'https://linkedin.com/in/zenemoo',
      },
      {
        id: '2',
        name: 'Alviya Firoz',
        designation: 'Lead Operations & Data Director',
        department: 'Operations & Delivery',
        bio: 'Overseeing multi-dialect speech transcription teams, quality assurance frameworks, and data integrity benchmarks.',
        linkedin: 'https://linkedin.com/in/zenemoo',
      },
      {
        id: '3',
        name: 'Data Engineering Lead',
        designation: 'Principal Solutions Architect',
        department: 'Engineering',
        bio: 'Designing high-throughput dataset pipelines, cloud infrastructure, and enterprise client integrations.',
      }
    ];
  }

  // --- Contact / Inquiry Submission ---
  async submitContactInquiry(submission: ContactSubmission): Promise<ApiResponse> {
    return await this.request<any>('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        ...submission,
        source: 'web.zenemoo.in',
        submitted_at: new Date().toISOString(),
      }),
    });
  }

  // --- Newsletter / Data Updates Subscription ---
  async subscribeNewsletter(email: string): Promise<ApiResponse> {
    return await this.request<any>('/api/subscribers', {
      method: 'POST',
      body: JSON.stringify({
        email,
        source: 'web.zenemoo.in',
        status: 'active',
      }),
    });
  }

  // --- Authentication / User Verification ---
  async verifySession(token?: string): Promise<ApiResponse<UserProfile>> {
    return await this.request<UserProfile>('/api/auth/me', {
      headers: this.getHeaders(token),
    });
  }
}

export const apiService = new ApiService();
