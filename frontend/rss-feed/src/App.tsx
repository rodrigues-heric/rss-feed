import type { JSX } from 'react';
import { Toaster } from 'sonner';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/index.routes';
import { AuthProvider } from './contexts/AuthContext';

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
