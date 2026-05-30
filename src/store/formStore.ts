import { create } from "zustand";

interface PersonalInfo {
  fullName: string;
  dob: string;
  email: string;
  phone: string;
}

interface EmploymentInfo {
  employer: string;
  jobTitle: string;
  income: string;
  yearsEmployed: string;
}

interface FormState {
  loanType: string | null;
  setLoanType: (type: string) => void;

  personalInfo: PersonalInfo | null;
  setPersonalInfo: (info: PersonalInfo) => void;

  employmentInfo: EmploymentInfo | null;
  setEmploymentInfo: (info: EmploymentInfo) => void;
}

export const useFormStore = create<FormState>((set) => ({
  loanType: null,
  setLoanType: (type: string) => set({ loanType: type }),

  personalInfo: null,
  setPersonalInfo: (info: PersonalInfo) => set({ personalInfo: info }),

  employmentInfo: null,
  setEmploymentInfo: (info: EmploymentInfo) => set({ employmentInfo: info }),
}));