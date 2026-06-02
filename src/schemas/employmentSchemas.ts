import { z } from "zod";

export const employmentSchema = z.object({
  employer: z.string().min(1, "Employer is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  income: z.string().min(1, "Monthly income is required"),
  yearsEmployed: z.string().min(1, "Years employed is required"),
  employmentType: z.enum(["Salaried", "Self-Employed", "Other"], {
    message: "Employment type is required",
  }),
});

export type EmploymentForm = z.infer<typeof employmentSchema>;
ok compile