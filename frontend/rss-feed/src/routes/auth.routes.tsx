import type { RouteObject } from 'react-router-dom';
import { Login } from '@/pages/login.page';
import { Register } from '@/pages/register.page';

export const authRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
];
