import { z } from "zod";

export const loanDetailsSchema = z.object({
  loanType: z.enum(["Personal", "Home", "Business"], {
    message: "Loan type is required",
  }),
  amount: z.string().min(1, "Loan amount is required"),
  purpose: z.string().optional(),          // optional
  durationMonths: z.string().optional(),
  propertyAddress: z.string().optional(),
  propertyValue: z.string().optional(),
  registrationNumber: z.string().optional(),
  turnover: z.string().optional(),
});

export type LoanDetailsForm = z.infer<typeof loanDetailsSchema>;
