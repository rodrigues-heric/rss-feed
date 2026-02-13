import { api } from '@/lib/api';
import { type RegisterFormData } from '@/interfaces/register.interface';
import type { LoginFormData } from '@/interfaces/login.interface';

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
      password: data.password
    });
    return response.data;
  }
};
