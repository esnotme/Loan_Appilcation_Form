import { create } from "zustand";

interface PersonalInfo {
  fullName: string;
  dob: string;
  email: string;
  phone: string;
}

export interface EmploymentInfo {
  employer: string;
  jobTitle: string;
  income: string;
  yearsEmployed: string;
  employmentType: "Salaried" | "Self-Employed" | "Other";
}


interface LoanDetails {
  amount: string;
  purpose: string;
  durationMonths: string;
}

interface CoApplicantInfo {
  fullName: string;
  relationship: string;
  email: string;
  phone: string;
}

interface AddressInfo {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

interface DocumentInfo {
  idProof: string;
  incomeProof: string;
  addressProof: string;
}

interface SignatureInfo {
  agree: boolean;
  signature: string;
}

interface VerificationInfo {
  pan: string;
  aadhaar: string;
  panVerified: boolean;
  aadhaarVerified: boolean;
}

interface FormState {
  loanType: string | null;
  setLoanType: (type: string) => void;

  personalInfo: PersonalInfo | null;
  setPersonalInfo: (info: PersonalInfo) => void;

  employmentInfo: EmploymentInfo | null;
  setEmploymentInfo: (info: EmploymentInfo) => void;

  loanDetails: LoanDetails | null;
  setLoanDetails: (info: LoanDetails) => void;

  coApplicantInfo: CoApplicantInfo | null;
  setCoApplicantInfo: (info: CoApplicantInfo) => void;

  addressInfo: AddressInfo | null;
  setAddressInfo: (info: AddressInfo) => void;

  documentInfo: DocumentInfo | null;
  setDocumentInfo: (info: DocumentInfo) => void;

  signatureInfo: SignatureInfo | null;
  setSignatureInfo: (info: SignatureInfo) => void;

  verificationInfo: VerificationInfo | null;
  setVerificationInfo: (info: VerificationInfo) => void;
}

export const useFormStore = create<FormState>((set) => ({
  loanType: null,
  setLoanType: (type: string) => set({ loanType: type }),

  personalInfo: null,
  setPersonalInfo: (info: PersonalInfo) => set({ personalInfo: info }),

  employmentInfo: null,
  setEmploymentInfo: (info: EmploymentInfo) => set({ employmentInfo: info }),

  loanDetails: null,
  setLoanDetails: (info: LoanDetails) => set({ loanDetails: info }),

  coApplicantInfo: null,
  setCoApplicantInfo: (info: CoApplicantInfo) => set({ coApplicantInfo: info }),

  addressInfo: null,
  setAddressInfo: (info: AddressInfo) => set({ addressInfo: info }),

  documentInfo: null,
  setDocumentInfo: (info: DocumentInfo) => set({ documentInfo: info }),

  signatureInfo: null,
  setSignatureInfo: (info: SignatureInfo) => set({ signatureInfo: info }),

  verificationInfo: null,
  setVerificationInfo: (info: VerificationInfo) => set({ verificationInfo: info }),
}));
