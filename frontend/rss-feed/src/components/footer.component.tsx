import type { JSX } from 'react';
import { RssIcon } from 'lucide-react';

export function Footer(): JSX.Element {
  return (
    <footer className="bg-[#1a1a1a] px-4 py-12 text-center text-white">
      <div className="mx-auto max-w-4xl">
        <h3 className="mb-4 flex items-center justify-center gap-x-2 font-serif text-2xl tracking-tighter uppercase italic hover:cursor-default">
          <RssIcon size={24} strokeWidth={1.5} /> RSS Feed
        </h3>
        <p className="mb-8 text-xs tracking-[0.2em] uppercase opacity-50 hover:cursor-default">
          All the news that fits into your pocket
        </p>
        <div className="flex justify-center gap-8 text-xs font-bold tracking-widest uppercase">
          <button className="hover:cursor-pointer hover:underline">
            About
          </button>
        </div>
      </div>
    </footer>
  );
}
