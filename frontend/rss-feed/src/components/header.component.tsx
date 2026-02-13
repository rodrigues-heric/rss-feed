import type { JSX } from 'react';
import { RssIcon } from 'lucide-react';

export function Header(): JSX.Element {
  return (
    <header className="border-b-2 border-[#1a1a1a] px-4 py-8 hover:cursor-default">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <div className="mb-2 flex items-center gap-3">
          <RssIcon className="size-[2em] md:size-[3em]" strokeWidth={2} />
          <h1 className="font-serif text-4xl font-black tracking-tighter uppercase md:text-6xl">
            RSS Feed
          </h1>
        </div>
        <div className="flex w-full items-center justify-center text-xs font-bold tracking-widest uppercase">
          <span>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </header>
  );
}
