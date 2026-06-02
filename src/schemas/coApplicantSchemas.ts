import { z } from "zod";

export const coApplicantSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  relationship: z.string().min(2, "Relationship is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export type CoApplicantForm = z.infer<typeof coApplicantSchema>;
