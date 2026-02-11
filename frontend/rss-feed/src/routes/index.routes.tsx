import { createBrowserRouter, Navigate } from 'react-router-dom';
import { authRoutes } from './auth.routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  ...authRoutes,
  {
    path: '*',
    element: <div className="p-10 font-serif">404 - Page Not Found</div>,
  },
]);
