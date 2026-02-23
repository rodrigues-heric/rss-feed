import { ExternalLink } from 'lucide-react';
import { Footer } from '@/components/footer.component';
import { useState } from 'react';
import { newsService } from '@/services/news.service';
import { useQuery } from '@tanstack/react-query';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/appsidebar.component';
import { FooterPagination } from '@/components/footer-pagination.component';
import { HeaderPagination } from '@/components/header-pagination.component';

const FIVE_MINUTES = 1000 * 60 * 5;

export function Home() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ['news', page],
    queryFn: () => newsService.getSubscribedNews(page),
    placeholderData: (previousData) => previousData,
    staleTime: FIVE_MINUTES,
  });

  const newsItems = data?.data || [];
  const meta = data?.meta;

  const handleNextPage = () => {
    if (meta?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col bg-[#fcfaf7] font-sans text-[#1a1a1a]">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-[#1a1a1a] bg-[#fcfaf7]/80 backdrop-blur-sm">
            <SidebarTrigger className="ml-2 size-9 hover:cursor-pointer [&_svg:not([class*='size-'])]:size-7" />
            <HeaderPagination
              page={page}
              meta={meta}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              isPlaceholderData={isPlaceholderData}
            />
          </div>

          <main className="mx-auto mb-4 w-full max-w-4xl flex-1 px-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-20">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#1a1a1a] border-t-transparent"></div>
                <p className="text-muted-foreground font-serif text-lg italic">
                  Gathering the latest intelligence...
                </p>
              </div>
            ) : isError ? (
              <div className="py-20 text-center">
                <p className="font-serif text-xl text-red-600 italic">
                  Failed to fetch news. Please try again later.
                </p>
              </div>
            ) : newsItems.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-serif text-xl italic">
                  No news items found. Subscribe to some feeds to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-8 py-8">
                <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
                  {newsItems.map((item) => (
                    <article
                      key={item.id}
                      className="group flex flex-col space-y-3"
                    >
                      <div className="border-b border-[#1a1a1a] pb-2">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">
                          {new Date(item.pubDate).toLocaleDateString(
                            undefined,
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </span>
                      </div>
                      <h2 className="line-clamp-2 font-serif text-2xl leading-tight transition-colors group-hover:text-[#555]">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.title}
                        </a>
                      </h2>
                      <p className="line-clamp-3 text-sm leading-relaxed text-[#444]">
                        {item.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <span className="text-[10px] font-bold italic opacity-70">
                          {item.author || 'Anonymous'}
                        </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase opacity-60 transition-opacity hover:opacity-100"
                        >
                          Read Story <ExternalLink size={10} />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>

                <FooterPagination
                  page={page}
                  meta={meta}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  isPlaceholderData={isPlaceholderData}
                />
              </div>
            )}
          </main>

          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
