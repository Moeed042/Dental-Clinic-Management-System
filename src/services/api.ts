import axios from 'axios';
import { Appointment, AppointmentStatus, ContactMessage, AdminUser, DashboardStats } from '../types';

// Create central Axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to catch 401 Unauthorized token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      // Dispatch custom auth-expired event for smooth router redirect
      window.dispatchEvent(new Event('auth:expired'));
    }
    return Promise.reject(error);
  }
);

// Authentication Service
export const authService = {
  login: async (emailOrUsername: string, password: string): Promise<{ token: string; admin: AdminUser }> => {
    const response = await api.post('/auth/login', {
      email: emailOrUsername,
      username: emailOrUsername,
      password,
    });
    const { token, admin } = response.data;
    if (token) {
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(admin));
    }
    return { token, admin };
  },

  getMe: async (): Promise<AdminUser> => {
    const response = await api.get('/auth/me');
    return response.data.admin;
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },

  getCurrentUser: (): AdminUser | null => {
    const userStr = localStorage.getItem('adminUser');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('adminToken');
  },
};

// Appointment Service
export const appointmentService = {
  create: async (data: {
    patient_name: string;
    email: string;
    phone: string;
    service: string;
    specialist: string;
    appointment_date: string;
    appointment_time: string;
    message?: string;
  }): Promise<{ success: boolean; message: string; data: Appointment }> => {
    const response = await api.post('/appointments', data);
    return response.data;
  },

  getAll: async (params?: {
    search?: string;
    status?: string;
    date?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    data: Appointment[];
    pagination: { total: number; page: number; limit: number; totalPages: number };
    stats?: DashboardStats;
  }> => {
    const response = await api.get('/appointments', { params });
    return response.data;
  },

  getById: async (id: number): Promise<Appointment> => {
    const response = await api.get(`/appointments/${id}`);
    return response.data.data;
  },

  update: async (id: number, data: Partial<Appointment>): Promise<Appointment> => {
    const response = await api.put(`/appointments/${id}`, data);
    return response.data.data;
  },

  updateStatus: async (id: number, status: AppointmentStatus): Promise<Appointment> => {
    const response = await api.patch(`/appointments/status/${id}`, { status });
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/appointments/${id}`);
  },

  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/appointments/stats');
    return response.data.data;
  },
};

// Message Service
export const messageService = {
  create: async (data: {
    name: string;
    phone?: string;
    email: string;
    service?: string;
    message: string;
  }): Promise<{ success: boolean; message: string; data: ContactMessage }> => {
    const response = await api.post('/messages', data);
    return response.data;
  },

  getAll: async (params?: {
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    data: ContactMessage[];
    pagination: { total: number; page: number; limit: number; totalPages: number };
  }> => {
    const response = await api.get('/messages', { params });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/messages/${id}`);
  },
};

export default api;
