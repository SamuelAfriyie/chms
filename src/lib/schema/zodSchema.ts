import z from "zod";

export const SigninFormSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password must be at least 8 characters"),
});