import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from '@/components/header.component';
import { Footer } from '@/components/footer.component';

export function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fcfaf7] font-sans text-[#1a1a1a]">
      <Header />

      <main className="mx-auto mb-4 w-full max-w-4xl flex-1 px-4">
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#1a1a1a] border-t-transparent"></div>
          <p className="text-muted-foreground font-serif text-lg italic">
            Gathering the latest intelligence...
          </p>
        </div>

        <div className="py-20 text-center">
          <p className="font-serif text-xl italic">
            No news items found. Subscribe to some feeds to get started!
          </p>
        </div>

        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
            Foo
          </div>

          <nav className="mt-8 flex items-center justify-between">
            <button className="flex items-center gap-2 border-2 border-[#1a1a1a] px-4 py-2 text-sm font-bold tracking-widest uppercase transition-all hover:cursor-pointer hover:bg-[#1a1a1a] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit">
              <ChevronLeft size={16} />
            </button>

            <div className="flex flex-col items-center hover:cursor-default">
              <span className="text-xs font-bold tracking-widest uppercase">
                Page 4
              </span>
              <span className="text-muted-foreground font-serif text-[10px] italic">
                of 7
              </span>
            </div>

            <button className="flex items-center gap-2 border-2 border-[#1a1a1a] px-4 py-2 text-sm font-bold tracking-widest uppercase transition-all hover:cursor-pointer hover:bg-[#1a1a1a] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit">
              <ChevronRight size={16} />
            </button>
          </nav>
        </div>
      </main>

      <Footer />
    </div>
  );
}
