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
import { useState, type JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  type LoginFormData,
  loginFormSchema,
} from '@/interfaces/login.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { userService } from '@/services/user.service';
import { toast } from 'sonner';

export function Login(): JSX.Element {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      await userService.login(data);
      navigate('/home');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Internal Bureau Error';

      toast.error('Invalid credentials', {
        description: Array.isArray(message) ? message[0] : message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen flex-col items-center px-6 pt-12 sm:justify-center sm:pt-0">
      <LoginHeader />

      <Card className="w-full max-w-100 border-none bg-transparent shadow-none">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register('email')}
                id="email"
                type="email"
                placeholder="u@example.com"
                className="border-foreground/30 focus-visible:border-foreground placeholder:text-foreground/20 h-10 rounded-none border-x-0 border-t-0 border-b bg-transparent px-0 text-lg focus-visible:ring-0"
              />
              {errors.email && (
                <p className="text-[0.6em] font-bold text-red-600 uppercase">
                  {errors.email.message}
                </p>
              )}
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
                {...register('password')}
                id="password"
                type="password"
                placeholder="••••••••"
                className="border-foreground/30 focus-visible:border-foreground h-10 rounded-none border-x-0 border-t-0 border-b bg-transparent px-0 focus-visible:ring-0"
              />
              {errors.password && (
                <p className="text-[0.6em] font-bold text-red-600 uppercase">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-6 px-0 pt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-foreground text-background hover:bg-foreground/90 h-14 w-full rounded-none text-sm font-bold tracking-[0.15em] uppercase transition-all hover:cursor-pointer"
            >
              {isLoading ? 'Authenticating...' : 'Authenticate Identity'}
            </Button>

            <div className="space-y-2 text-center">
              <p className="text-foreground/60 text-xs tracking-tight uppercase hover:cursor-default">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-foreground font-black decoration-1 underline-offset-4 hover:cursor-pointer hover:underline"
                >
                  Register account
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>

      <LoginFooter />
    </div>
  );
}
