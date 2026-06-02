import { z } from "zod";

export const signatureSchema = z.object({
  agree: z.boolean().refine(val => val === true, {
    message: "You must agree before continuing",
  }),
  signature: z.string().min(2, "Signature is required"),
});

export type SignatureForm = z.infer<typeof signatureSchema>;
