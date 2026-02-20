import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Footer } from '@/components/footer.component';
import { useState, type JSX } from 'react';
import { newsService } from '@/services/news.service';
import { useQuery } from '@tanstack/react-query';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
} from '@/components/ui/sidebar';
import { Sidebar, useSidebar } from '@/components/ui/sidebar';
import type { PaginationMeta } from '@/interfaces/pagination.interface';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

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

function AppSidebar(): JSX.Element {
  const { toggleSidebar } = useSidebar();
  const { logout } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="font-serif text-xl font-black tracking-tighter uppercase">
          RSS Feed
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>TODO: group 1</SidebarGroup>
        <SidebarGroup>TODO: group 2</SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={toggleSidebar}
          className="bg-background text-foreground hover:bg-background/90 h-14 w-full rounded-none text-sm font-bold tracking-[0.15em] uppercase transition-all hover:cursor-pointer"
        >
          Close
        </Button>
        <Button
          onClick={logout}
          className="bg-foreground text-background hover:bg-foreground/90 h-14 w-full rounded-none text-sm font-bold tracking-[0.15em] uppercase transition-all hover:cursor-pointer"
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

function HeaderPagination({
  page,
  meta,
  handlePrevPage,
  handleNextPage,
  isPlaceholderData,
}: {
  page: number;
  meta: PaginationMeta | undefined;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  isPlaceholderData: boolean;
}): JSX.Element {
  return (
    <>
      {meta && (
        <nav className="mr-2 flex items-center justify-between">
          <button
            onClick={handlePrevPage}
            disabled={page === 1 || isPlaceholderData}
            className="mr-2 flex items-center gap-2 px-4 py-2 text-sm font-bold tracking-widest uppercase transition-all hover:cursor-pointer hover:bg-[#1a1a1a] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
          >
            <ChevronLeft size={14} />
          </button>

          <div className="flex flex-col items-center hover:cursor-default">
            <span className="text-xs font-bold tracking-widest uppercase">
              PAGE {meta.page}
            </span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={!meta.hasNextPage || isPlaceholderData}
            className="ml-2 flex items-center gap-2 px-4 py-2 text-sm font-bold tracking-widest uppercase transition-all hover:cursor-pointer hover:bg-[#1a1a1a] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
          >
            <ChevronRight size={14} />
          </button>
        </nav>
      )}
    </>
  );
}

function FooterPagination({
  page,
  meta,
  handlePrevPage,
  handleNextPage,
  isPlaceholderData,
}: {
  page: number;
  meta: PaginationMeta | undefined;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  isPlaceholderData: boolean;
}): JSX.Element {
  return (
    <>
      {meta && (
        <nav className="mt-16 flex items-center justify-between border-t border-[#1a1a1a] pt-8">
          <button
            onClick={handlePrevPage}
            disabled={page === 1 || isPlaceholderData}
            className="flex items-center gap-2 border-2 border-[#1a1a1a] px-4 py-2 text-sm font-bold tracking-widest uppercase transition-all hover:cursor-pointer hover:bg-[#1a1a1a] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex flex-col items-center hover:cursor-default">
            <span className="text-xs font-bold tracking-widest uppercase">
              Page {meta.page}
            </span>
            <span className="text-muted-foreground font-serif text-[10px] italic">
              of {meta.lastPage}
            </span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={!meta.hasNextPage || isPlaceholderData}
            className="flex items-center gap-2 border-2 border-[#1a1a1a] px-4 py-2 text-sm font-bold tracking-widest uppercase transition-all hover:cursor-pointer hover:bg-[#1a1a1a] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
          >
            <ChevronRight size={16} />
          </button>
        </nav>
      )}
    </>
  );
}
