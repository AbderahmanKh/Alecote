import axios from 'axios';

// Base API URL - Change this to your backend URL
const API_BASE_URL = 'https://alecote-be.onrender.com/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Type definitions
export interface Booking {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  paymentProof?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  updatedAt: string;
}

export interface AvailableDate {
  isAvailable: any;
  _id: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  acceptedBookings: number;
  declinedBookings: number;
}

export interface LoginResponse {
  token: string;
}

// Helper function to extract string ID from MongoDB ObjectId
const getStringId = (id: any): string => {
  if (typeof id === 'string') {
    return id;
  }
  if (id && typeof id === 'object' && id.$oid) {
    return id.$oid;
  }
  if (id && id.toString) {
    return id.toString();
  }
  return String(id);
};

// API Service Class
export class ApiService {
  // Authentication
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  }

  // Bookings
  async createBooking(formData: FormData): Promise<Booking> {
    const response = await api.post('/bookings', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async getBookings(): Promise<Booking[]> {
    const response = await api.get('/bookings');
    return response.data;
  }

  async updateBookingStatus(bookingId: any, status: 'accepted' | 'declined'): Promise<Booking> {
    const id = getStringId(bookingId);
    console.log('Updating booking ID:', id, 'to status:', status);
    
    const response = await api.put(`/bookings/${id}/status`, { status });
    return response.data;
  }

  // Available Dates
  async getAvailableDates(): Promise<AvailableDate[]> {
    const response = await api.get('/dates');
    return response.data;
  }

  async addAvailableDate(date: string): Promise<AvailableDate> {
    const response = await api.post('/dates', { date });
    return response.data;
  }

  async removeAvailableDate(dateId: string): Promise<void> {
    await api.delete(`/dates/${dateId}`);
  }

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get('/dashboard/stats');
    return response.data;
  }
}

// Export singleton instance
export const apiService = new ApiService();