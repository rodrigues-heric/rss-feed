import { useState } from 'react';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/appsidebar.component';
import { Footer } from '@/components/footer.component';
import { useAuth } from '@/contexts/AuthContext';
import { rssService } from '@/services/rss.service';

export function Profile() {
  const { user, feeds, setFeeds } = useAuth();
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    const trimmed = url.trim();
    if (!trimmed) return;

    setError(null);
    setIsSubmitting(true);
    try {
      const result = await rssService.subscribe(trimmed);
      setFeeds((prev) => {
        const alreadyExists = prev.some((f) => f._id === result.feedId);
        if (alreadyExists) return prev;
        return [...prev, { _id: result.feedId, url: result.url }];
      });
      setUrl('');
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        'Failed to add feed. Please check the URL.';
      setError(Array.isArray(msg) ? msg.join(' ') : msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnsubscribe = async (feedId: string) => {
    try {
      await rssService.unsubscribe(feedId);
      setFeeds((prev) => prev.filter((f) => f._id !== feedId));
    } catch {}
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col bg-[#fcfaf7] font-sans text-[#1a1a1a]">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-[#1a1a1a] bg-[#fcfaf7]/80 backdrop-blur-sm">
            <SidebarTrigger className="ml-2 size-9 hover:cursor-pointer [&_svg:not([class*='size-'])]:size-7" />
            <span className="mr-4 text-sm font-bold tracking-widest uppercase hover:cursor-default">
              Profile
            </span>
          </div>

          <main className="mx-auto mb-4 w-full max-w-4xl flex-1 px-4 py-8">
            <header className="mb-10 border-b-4 border-[#1a1a1a] pb-2 text-center hover:cursor-default md:text-left">
              <h2 className="font-serif text-4xl font-black tracking-tighter uppercase">
                Reader Profile
              </h2>
              <p className="font-serif text-lg italic opacity-80">
                Manage your subscription and news dispatches
              </p>
            </header>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <section className="hover:cursor-default md:col-span-1">
                <h3 className="mb-4 border-b border-[#1a1a1a] pb-1 text-xs font-black tracking-widest uppercase">
                  Account Identity
                </h3>
                <div className="space-y-1">
                  <span className="text-[0.6em] font-bold uppercase opacity-60">
                    Verified Email
                  </span>
                  <p className="font-serif text-xl font-bold break-all">
                    {user ? user?.email : 'Loading...'}
                  </p>
                </div>

                <div className="mt-8 border border-dashed border-[#1a1a1a]/30 bg-[#1a1a1a]/5 p-4">
                  <p className="text-[0.7em] leading-tight italic opacity-70">
                    Your credentials grant you access to the automated news
                    gatherer. Sources are polled every 15 minutes.
                  </p>
                </div>
              </section>

              <section className="md:col-span-2">
                <h3 className="mb-4 border-b border-[#1a1a1a] pb-1 text-xs font-black tracking-widest uppercase hover:cursor-default">
                  Newsroom Sources
                </h3>

                <div className="mb-8 flex flex-col gap-2">
                  <label className="text-[0.6em] font-bold tracking-wider uppercase">
                    Add New RSS Dispatch Link
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                      placeholder="https://news.org/rss"
                      disabled={isSubmitting}
                      className="flex-1 rounded-none border-b-2 border-[#1a1a1a] bg-transparent px-2 py-1 transition-colors outline-none placeholder:italic focus:border-red-800 disabled:opacity-50"
                    />
                    <button
                      onClick={handleSubscribe}
                      disabled={isSubmitting || !url.trim()}
                      className="border-2 border-[#1a1a1a] bg-[#1a1a1a] px-4 py-1 text-[0.6em] font-bold tracking-tighter text-white uppercase transition-all hover:cursor-pointer hover:bg-transparent hover:text-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? 'Adding…' : 'Append'}
                    </button>
                  </div>
                  {error && (
                    <p className="text-[0.65em] font-semibold text-red-700">
                      {error}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  {feeds.length === 0 && (
                    <p className="text-[0.75em] italic opacity-50">
                      No sources added yet. Append an RSS URL above.
                    </p>
                  )}
                  {feeds.map((feed) => (
                    <div
                      key={feed._id}
                      className="group flex items-center justify-between border-b border-[#1a1a1a]/10 pb-3"
                    >
                      <div className="flex flex-col">
                        <span className="text-[0.6em] font-bold text-red-800 uppercase hover:cursor-default">
                          Active Source
                        </span>
                        <p className="max-w-[250px] truncate font-serif text-lg font-bold sm:max-w-md">
                          {feed.url}
                        </p>
                      </div>
                      <button
                        onClick={() => handleUnsubscribe(feed._id)}
                        className="text-[0.6em] font-black tracking-widest text-[#1a1a1a]/40 uppercase transition-colors hover:cursor-pointer hover:text-red-700"
                      >
                        [ Terminate ]
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>

          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
