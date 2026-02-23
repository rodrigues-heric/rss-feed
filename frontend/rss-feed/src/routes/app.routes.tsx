import { Home } from '@/pages/home.page';
import { type RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute.tsx';
import { Profile } from '@/pages/profile.page';

export const appRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
];
