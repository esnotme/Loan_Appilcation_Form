import { useState } from "react";
import LoanTypeStep from "../steps/LoanTypeStep";
import PersonalInfoStep from "../steps/PersonalInfoStep";
import EmploymentStep from "../steps/EmploymentStep";
import LoanDetailsStep from "../steps/LoanDetailsStep";
import CoApplicantStep from "../steps/CoApplicantStep";
import AddressStep from "../steps/AddressStep";
import DocumentUploadStep from "../steps/DocumentUploadStep";
import SignatureStep from "../steps/SignatureStep";
import ReviewStep from "../steps/ReviewStep";

export default function Wizard() {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      {step === 0 && <LoanTypeStep onNext={nextStep} />}
      {step === 1 && <PersonalInfoStep onNext={nextStep} onBack={prevStep} />}
      {step === 2 && <EmploymentStep onNext={nextStep} onBack={prevStep} />}
      {step === 3 && <LoanDetailsStep onNext={nextStep} onBack={prevStep} />}
      {step === 4 && <CoApplicantStep onNext={nextStep} onBack={prevStep} />}
      {step === 5 && <AddressStep onNext={nextStep} onBack={prevStep} />}
      {step === 6 && <DocumentUploadStep onNext={nextStep} onBack={prevStep} />}
      {step === 7 && <SignatureStep onNext={nextStep} onBack={prevStep} />}
      {step === 8 && <SignatureStep onNext={nextStep} onBack={prevStep} />}
      {step === 9 && <ReviewStep onBack={prevStep} />}
    </div>
  );
}
