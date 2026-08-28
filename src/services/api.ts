export interface ApiResponse<T = any> {
  success?: boolean;
  status?: string;
  service?: string;
  timestamp?: string;
  data?: T;
  message?: string;
  error?: string;
  code?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://zenemootech-api.onrender.com';

class ApiService {
  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
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
          message: 'Request timed out. Please try again.',
        };
      }

      return {
        success: false,
        status: 'NETWORK_ERROR',
        message: err.message || 'Unable to connect to Zenemoo backend services.',
      };
    }
  }

  // --- Early Access / Subscribers Endpoint ---
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
}

export const apiService = new ApiService();
