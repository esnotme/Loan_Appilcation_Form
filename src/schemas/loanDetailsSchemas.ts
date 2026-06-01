import { z } from "zod";

export const loanDetailsSchema = z.object({
  amount: z.string().regex(/^\d+$/, "Amount must be a number"),
  purpose: z.string().min(3, "Purpose is required"),
  durationMonths: z.string().regex(/^\d+$/, "Duration must be in months"),
});

export type LoanDetailsForm = z.infer<typeof loanDetailsSchema>;
