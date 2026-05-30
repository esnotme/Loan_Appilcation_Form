import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be YYYY-MM-DD"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export type PersonalInfoForm = z.infer<typeof personalInfoSchema>;
