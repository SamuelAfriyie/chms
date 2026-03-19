import z from "zod";

export const SigninFormSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password must be at least 8 characters"),
});

export const RegisterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm the password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const AssignRoleSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: z.string().min(1, "Role is required"),
});