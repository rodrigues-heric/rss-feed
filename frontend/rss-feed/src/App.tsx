import type { JSX } from 'react';
import { Toaster } from 'sonner';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/index.routes';

export default function App(): JSX.Element {
  return (
    <>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />;
    </>
  );
}
