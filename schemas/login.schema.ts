import { z } from "zod";


export const LoginSchema = z.object({
  Nome: z.string().min(3).max(24).regex(/^[a-zA-Z0-9_\[\]]+$/),
  password: z.string().min(3).max(40),
});

export type LoginInput = z.infer<typeof LoginSchema>;
