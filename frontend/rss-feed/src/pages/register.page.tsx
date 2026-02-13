import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

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
import {
  type RegisterFormData,
  registerSchema,
} from '@/interfaces/register.interface';
import { userService } from '@/services/user.service';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export function Register(): JSX.Element {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await userService.register(data);

      toast.success('Credentials registered successfully!', {
        description: 'Redirecting to login.',
      });

      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Internal Bureau Error';

      toast.error('Registration Failed', {
        description: Array.isArray(message) ? message[0] : message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen flex-col items-center px-6 pt-8 pb-12 sm:justify-center sm:pt-0">
      <LoginHeader />

      <Card className="w-full max-w-100 border-none bg-transparent shadow-none">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="px-0 pt-0">
            <CardTitle className="font-serif text-3xl font-medium tracking-tight italic hover:cursor-default">
              Apply for credentials.
            </CardTitle>
            <CardDescription className="text-foreground/70 text-base hover:cursor-default">
              Create your account to start curating your own intelligence
              stream.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 px-0 pt-2">
            <div className="space-y-1">
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

            <div className="space-y-1">
              <Label
                htmlFor="confirm-email"
                className="text-[0.7em] font-black tracking-widest uppercase opacity-70"
              >
                Confirm email
              </Label>
              <Input
                {...register('confirmEmail')}
                id="confirm-email"
                type="email"
                placeholder="u@example.com"
                className="border-foreground/30 focus-visible:border-foreground placeholder:text-foreground/20 h-10 rounded-none border-x-0 border-t-0 border-b bg-transparent px-0 text-lg focus-visible:ring-0"
              />
              {errors.confirmEmail && (
                <p className="text-[0.6em] font-bold text-red-600 uppercase">
                  {errors.confirmEmail.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="password"
                className="text-[0.7em] font-black tracking-widest uppercase opacity-70"
              >
                Password
              </Label>
              <Input
                {...register('password')}
                id="password"
                type="password"
                placeholder="••••••••"
                className="border-foreground/30 focus-visible:border-foreground placeholder:text-foreground/20 h-10 rounded-none border-x-0 border-t-0 border-b bg-transparent px-0 focus-visible:ring-0"
              />
              {errors.password && (
                <p className="text-[0.6em] font-bold text-red-600 uppercase">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="confirm-password"
                className="text-[0.7em] font-black tracking-widest uppercase opacity-70"
              >
                Confirm password
              </Label>
              <Input
                {...register('confirmPassword')}
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="border-foreground/30 focus-visible:border-foreground placeholder:text-foreground/20 h-10 rounded-none border-x-0 border-t-0 border-b bg-transparent px-0 focus-visible:ring-0"
              />
              {errors.confirmPassword && (
                <p className="text-[0.6em] font-bold text-red-600 uppercase">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-6 px-0 pt-8">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-foreground text-background hover:bg-foreground/90 h-14 w-full rounded-none text-sm font-bold tracking-[0.15em] uppercase shadow-md transition-all hover:cursor-pointer"
            >
              {isLoading ? 'Processing...' : 'Register Credentials'}
            </Button>

            <div className="text-center">
              <p className="text-foreground/60 text-xs tracking-tight uppercase hover:cursor-default">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-foreground font-black decoration-1 underline-offset-4 hover:cursor-pointer hover:underline"
                >
                  Return to Login
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
