import { api } from '@/lib/api';
import { type RegisterFormData } from '@/interfaces/register.interface';
import type { LoginFormData } from '@/interfaces/login.interface';
import type { Feed } from '@/interfaces/feed.interface';

export const userService = {
  async register(data: Omit<RegisterFormData, 'confirmPassword' | 'name'>) {
    const response = await api.post('/users/register', {
      email: data.email,
      password: data.password,
    });
    return response.data;
  },

  async login(data: LoginFormData) {
    const response = await api.post('/auth/login', {
      email: data.email,
      password: data.password,
    });
    return response.data;
  },

  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async getSubscriptions(): Promise<{ feeds: Feed[] }> {
    const response = await api.get('/users/subscriptions');
    return response.data;
  },

  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};
