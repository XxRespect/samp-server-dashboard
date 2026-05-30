import { z } from "zod";


export const LoginSchema = z.object({
  Nome: z.string().min(2).max(24),
  password: z.string().min(2).max(40),
});

export type LoginInput = z.infer<typeof LoginSchema>;
