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

  const articleTitle = (itemTitle: string): JSX.Element => {
    return (
      <h2 className="text-justify font-serif text-2xl leading-tight font-bold wrap-break-word hyphens-auto">
        {itemTitle}
      </h2>
    );
  };

  const articleDate = (date: string): JSX.Element => {
    return (
      <div className="mt-4 flex justify-center border-y border-[#1a1a1a] py-2">
        <span className="text-[0.8em] font-bold tracking-[0.2em] uppercase opacity-60">
          {new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    );
  };

  const articleBody = (content: string): JSX.Element => {
    return (
      <p
        className="mt-4 text-justify text-[1em] leading-relaxed wrap-break-word hyphens-auto text-[#444]"
        dangerouslySetInnerHTML={{ __html: content }}
      ></p>
    );
  };

  const articleAuthor = (author: string | undefined): JSX.Element => {
    return (
      <>
        {author ? (
          <div className="mt-4 flex items-center justify-end pt-4">
            <span className="text-[0.9em] font-bold italic opacity-70">
              {`— ${author}`}
            </span>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  const articleSource = (sourceURL: string): JSX.Element => {
    return (
      <div className="mt-4">
        <span className="text-[0.8em] font-bold text-[#444]">
          Source:{' '}
          <a
            className="text-[#444] opacity-60 transition-opacity hover:opacity-100"
            href={sourceURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {sourceURL}
          </a>
        </span>
      </div>
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
            {articleTitle(item.title)}
            {articleDate(item.pubDate)}
            {articleBody(item.content)}
            {articleAuthor(item.author)}
            {articleSource(item.link)}
          </main>

          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
