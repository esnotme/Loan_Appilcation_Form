import { z } from "zod";

export const coApplicantSchema = z.object({
  fullName: z.string().min(2, "Full name is required").optional().or(z.literal("")),
  relationship: z.string().min(2, "Relationship is required").optional().or(z.literal("")),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional().or(z.literal("")),
});

export type CoApplicantForm = z.infer<typeof coApplicantSchema>;