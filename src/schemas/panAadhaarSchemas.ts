import { z } from "zod";

export const verificationSchema = z.object({
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  aadhaar: z.string().regex(/^[0-9]{12}$/, "Aadhaar must be 12 digits"),
});

export type VerificationForm = z.infer<typeof verificationSchema>;
