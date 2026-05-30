import { z } from "zod";

export const loanTypeSchema = z.object({
  loanType: z.enum(["Personal", "Home", "Business"])
    .refine((val) => val !== undefined, {
      message: "Please select a loan type",
    }),
});
