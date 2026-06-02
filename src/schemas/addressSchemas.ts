import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().regex(/^\d{4,10}$/, "Postal code must be 4–10 digits"),
});

export type AddressForm = z.infer<typeof addressSchema>;
