import { AppSidebar } from '@/components/appsidebar.component';
import { Footer } from '@/components/footer.component';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import type { NewsItem } from '@/interfaces/news.interface';
import type { JSX } from 'react';
import { useLocation } from 'react-router-dom';

export function NewPage(): JSX.Element {
  const location = useLocation();
  const item: NewsItem = location.state;

  const title = (itemTitle: string): JSX.Element => {
    return (
      <h2 className="text-justify font-serif text-2xl leading-tight font-bold wrap-break-word hyphens-auto">
        {itemTitle}
      </h2>
    );
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-[#1a1a1a] bg-[#fcfaf7]/80 backdrop-blur-sm">
          <SidebarTrigger className="ml-2 size-9 hover:cursor-pointer [&_svg:not([class*='size-'])]:size-7" />
        </div>

        <div className="flex min-h-screen flex-col bg-[#fcfaf7] font-sans text-[#1a1a1a]">
          <main className="mx-auto mt-3 mb-4 w-full max-w-4xl flex-1 px-4">
            {title(item.title)}
          </main>

          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
