import type { JSX } from 'react';
import { Toaster } from 'sonner';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/index.routes';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" richColors />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}
