import { AppSidebar } from '@/components/appsidebar.component';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { JSX } from 'react';

export function NewPage(): JSX.Element {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col bg-[#fcfaf7] font-sans text-[#1a1a1a]">
          <main className="mx-auto mb-4 w-full max-w-4xl flex-1 px-4">
            <span>It works!</span>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
