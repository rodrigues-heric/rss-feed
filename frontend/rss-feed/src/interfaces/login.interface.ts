import * as z from 'zod';

export const loginFormSchema = z
  .object({
    email: z.email('Invalid email format'),
    password: z.string(),
  });

export type LoginFormData = z.infer<typeof loginFormSchema>;
