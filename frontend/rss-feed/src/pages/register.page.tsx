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
import { LoginHeader } from '@/components/loginHeader.component';
import { LoginFooter } from '@/components/loginFooter.component';
import type { JSX } from 'react';

export function Register(): JSX.Element {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center px-6 pt-8 pb-12 sm:justify-center sm:pt-0">
      <LoginHeader />

      <Card className="w-full max-w-100 border-none bg-transparent shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="font-serif text-3xl font-medium tracking-tight italic hover:cursor-default">
            Apply for credentials.
          </CardTitle>
          <CardDescription className="text-foreground/70 text-base hover:cursor-default">
            Create your account to start curating your own intelligence stream.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 px-0 pt-2">
          <div className="space-y-1">
            <Label
              htmlFor="name"
              className="text-[0.7em] font-black tracking-widest uppercase opacity-70"
            >
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="J. Doe"
              className="border-foreground/30 focus-visible:border-foreground placeholder:text-foreground/20 h-10 rounded-none border-x-0 border-t-0 border-b bg-transparent px-0 text-lg focus-visible:ring-0"
            />
          </div>

          <div className="space-y-1">
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

          <div className="space-y-1">
            <Label
              htmlFor="password"
              className="text-[0.7em] font-black tracking-widest uppercase opacity-70"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="border-foreground/30 focus-visible:border-foreground placeholder:text-foreground/20 h-10 rounded-none border-x-0 border-t-0 border-b bg-transparent px-0 focus-visible:ring-0"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="confirm-password"
              className="text-[0.7em] font-black tracking-widest uppercase opacity-70"
            >
              Confirm password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              className="border-foreground/30 focus-visible:border-foreground placeholder:text-foreground/20 h-10 rounded-none border-x-0 border-t-0 border-b bg-transparent px-0 focus-visible:ring-0"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-6 px-0 pt-8">
          <Button className="bg-foreground text-background hover:bg-foreground/90 h-14 w-full rounded-none text-sm font-bold tracking-[0.15em] uppercase shadow-md transition-all hover:cursor-pointer">
            Register Credentials
          </Button>

          <div className="text-center">
            <p className="text-foreground/60 text-xs tracking-tight uppercase hover:cursor-default">
              Already have an account?{' '}
              <button className="text-foreground font-black decoration-1 underline-offset-4 hover:cursor-pointer hover:underline">
                Return to Login
              </button>
            </p>
          </div>
        </CardFooter>
      </Card>

      <LoginFooter />
    </div>
  );
}
