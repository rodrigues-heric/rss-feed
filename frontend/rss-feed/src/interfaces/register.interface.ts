import * as z from 'zod';

export const registerSchema = z
  .object({
    email: z.email('Invalid email format'),
    confirmEmail: z.string(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(12),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: 'Emails do not match',
    path: ['confirmEmail'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
