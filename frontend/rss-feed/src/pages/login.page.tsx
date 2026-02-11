import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { JSX } from 'react';

export function Login(): JSX.Element {
  const currentDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="bg-background flex min-h-screen flex-col items-center px-6 pt-12 sm:justify-center sm:pt-0">
      <header className="mb-10 w-full max-w-100 text-center">
        <h1 className="border-foreground border-b-4 pb-2 font-serif text-5xl font-black tracking-tighter uppercase hover:cursor-default">
          RSS Feed
        </h1>
        <div className="border-foreground/30 flex items-center justify-between border-b py-1.5 text-[0.6em] font-bold tracking-[0.2em] uppercase">
          <span className="hover:cursor-default">{currentDate}</span>
          <span className="hover:cursor-default">Digital</span>
        </div>
      </header>

      <Card className="w-full max-w-100 border-none bg-transparent shadow-none">
        <CardHeader className="px-0 pt-0 text-center sm:text-left">
          <CardTitle className="font-serif text-3xl font-medium tracking-tight italic hover:cursor-default">
            Sign in to your briefing.
          </CardTitle>
          <CardDescription className="text-foreground/70 text-base hover:cursor-default">
            Access the latest dispatches from your selected sources.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-0 pt-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-[0.7em] font-black tracking-widest uppercase opacity-70"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="correspondent@press.com"
              className="border-foreground/30 focus-visible:border-foreground placeholder:text-foreground/20 h-10 rounded-none border-x-0 border-t-0 border-b bg-transparent px-0 text-lg focus-visible:ring-0"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-[0.7em] font-black tracking-widest uppercase opacity-70"
              >
                Password
              </Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="***"
              className="border-foreground/30 focus-visible:border-foreground h-10 rounded-none border-x-0 border-t-0 border-b bg-transparent px-0 focus-visible:ring-0"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-6 px-0 pt-6">
          <Button className="bg-foreground text-background hover:bg-foreground/90 h-14 w-full rounded-none text-sm font-bold tracking-[0.15em] uppercase transition-all hover:cursor-pointer">
            Authenticate Identity
          </Button>

          <div className="space-y-2 text-center">
            <p className="text-foreground/60 text-xs tracking-tight uppercase hover:cursor-default">
              Don't have an account?{' '}
              <button className="text-foreground font-black decoration-1 underline-offset-4 hover:cursor-pointer hover:underline">
                Register account
              </button>
            </p>
          </div>
        </CardFooter>
      </Card>

      <footer className="text-foreground/40 mt-16 mb-8 max-w-75 text-center text-[0.5em] leading-relaxed tracking-[0.3em] uppercase hover:cursor-default">
        Reliable Information Through Aggregated Streams &copy; 2026
      </footer>
    </div>
  );
}
