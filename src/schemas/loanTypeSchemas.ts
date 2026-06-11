// src/schemas/loanTypeSchema.ts
import { z } from "zod";

export const loanTypeSchema = z.object({
  loanType: z.enum(["personal", "home", "selfEmployed"], {
    message: "Loan type is required",
  }),
});

export type LoanTypeForm = z.infer<typeof loanTypeSchema>;
