import { Home } from '@/pages/home.page';
import { type RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute.tsx';

export const appRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
];
