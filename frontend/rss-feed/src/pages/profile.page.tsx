import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/appsidebar.component';
import { Footer } from '@/components/footer.component';

export function Profile() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col bg-[#fcfaf7] font-sans text-[#1a1a1a]">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-[#1a1a1a] bg-[#fcfaf7]/80 backdrop-blur-sm">
            <SidebarTrigger className="ml-2 size-9 hover:cursor-pointer [&_svg:not([class*='size-'])]:size-7" />
            <span className="mr-4 text-sm font-bold tracking-widest uppercase">
              Profile
            </span>
          </div>

          <main className="mx-auto mb-4 w-full max-w-4xl flex-1 px-4"></main>

          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
