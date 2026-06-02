import { z } from "zod";

export const documentSchema = z.object({
  idProof: z.string().min(1, "ID proof is required"),
  incomeProof: z.string().min(1, "Income proof is required"),
  addressProof: z.string().min(1, "Address proof is required"),
  salarySlips: z.string().optional(),
  itrDocs: z.string().optional(),
  otherDocs: z.string().optional(),
});

export type DocumentForm = z.infer<typeof documentSchema>;
