import type { JSX } from 'react';

export function LoginHeader(): JSX.Element {
  const currentDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="mb-10 w-full max-w-100 text-center">
      <h1 className="border-foreground border-b-4 pb-2 font-serif text-5xl font-black tracking-tighter uppercase hover:cursor-default">
        RSS Feed
      </h1>
      <div className="border-foreground/30 flex items-center justify-between border-b py-1.5 text-[0.6em] font-bold tracking-[0.2em] uppercase">
        <span className="hover:cursor-default">{currentDate}</span>
        <span className="hover:cursor-default">Digital</span>
      </div>
    </header>
  );
}
