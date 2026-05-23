import z from 'zod';

export const authSchema = z.object({
  email: z.email().min(1, 'Email required'),
  password: z
    .string()
    .min(8, 'Minimum length: 8')
    .regex(/[A-Za-z]/, 'Must contain at least one letter'),
});
