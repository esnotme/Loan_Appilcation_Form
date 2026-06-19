import { z } from "zod";

/* ========================
   LOAN TYPE
======================== */
export const loanTypeSchema = z.object({
  loanType: z.enum(["personal", "home", "business"], {
    error: "Please select a loan type",
  }),
});

/* ========================
   LOAN DETAILS
======================== */
export const loanDetailsSchema = z.object({
  loanType: z.enum(["personal", "home", "business"]),
  amount: z.string().min(1, "Loan amount is required"),
  purpose: z.string().optional(),
  durationMonths: z.string().optional(),
  propertyAddress: z.string().optional(),
  propertyValue: z.string().optional(),
  registrationNumber: z.string().optional(),
  turnover: z.string().optional(),
});

/* ========================
   PERSONAL INFO
======================== */
export const personalInfoSchema = z.object({
  fullName: z.string().min(2),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  email: z.string().email(),
  phone: z.string().min(10),
});

/* ========================
   EMPLOYMENT
======================== */
export const employmentSchema = z.object({
  employer: z.string().min(1),
  jobTitle: z.string().min(1),
  income: z.string().min(1),
  yearsEmployed: z.string().min(1),
  employmentType: z.enum(["Salaried", "Self-Employed", "Other"]),
});

/* ========================
   ADDRESS
======================== */
export const addressSchema = z.object({
  street: z.string().min(3),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().regex(/^\d{4,10}$/),
});

/* ========================
   CO APPLICANT
======================== */
export const coApplicantSchema = z.object({
  fullName: z.string().min(2),
  relationship: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
});

/* ========================
   DOCUMENTS
======================== */
export const documentSchema = z.object({
  idProof: z.string().min(1),
  incomeProof: z.string().min(1),
  addressProof: z.string().min(1),
  salarySlips: z.string().optional(),
  itrDocs: z.string().optional(),
  otherDocs: z.string().optional(),
});

/* ========================
   SIGNATURE
======================== */
export const signatureSchema = z.object({
  agree: z.boolean().refine(val => val === true, {
    message: "You must agree before continuing",
  }),
  signature: z.string().min(2),
});

/* ========================
   PAN / AADHAAR
======================== */
export const verificationSchema = z.object({
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
  aadhaar: z.string().regex(/^[0-9]{12}$/),
});