import { Home } from '@/pages/home.page';
import { type RouteObject } from 'react-router-dom';

export const appRoutes: RouteObject[] = [
  {
    path: '/home',
    element: <Home />,
  },
];
