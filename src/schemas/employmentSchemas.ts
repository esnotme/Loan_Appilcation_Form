import { z } from "zod";

export const employmentSchema = z.object({
  employer: z.string().min(2, "Employer name is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  income: z.string().regex(/^\d+$/, "Income must be a number"),
  yearsEmployed: z.string().regex(/^\d+$/, "Years employed must be a number"),
});

export type EmploymentForm = z.infer<typeof employmentSchema>;
