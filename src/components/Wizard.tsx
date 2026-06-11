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
import PreApprovalSummary from "../steps/PreApprovalSummary";
import AutoSaveWrapper from "../components/AutoSaveWrapper";
import ProgressBar from "../components/ProgressBar";

export default function Wizard() {
  const [step, setStep] = useState(0);
  const totalSteps = 10;

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <AutoSaveWrapper>
      <div className="min-h-screen bg-[var(--color-bg)]">
        {/* ✅ Progress bar at the very top */}
        <div className="max-w-4xl mx-auto px-6 py-4">
          <ProgressBar currentStep={step} totalSteps={totalSteps} />
        </div>

        {/* ✅ Step content */}
        {step === 0 && <LoanTypeStep onNext={nextStep} />}
        {step === 1 && <PersonalInfoStep onNext={nextStep} onBack={prevStep} />}
        {step === 2 && <EmploymentStep onNext={nextStep} onBack={prevStep} />}
        {step === 3 && <LoanDetailsStep onNext={nextStep} onBack={prevStep} />}
        {step === 4 && <CoApplicantStep onNext={nextStep} onBack={prevStep} />}
        {step === 5 && <AddressStep onNext={nextStep} onBack={prevStep} />}
        {step === 6 && <DocumentUploadStep onNext={nextStep} onBack={prevStep} />}
        {step === 7 && <SignatureStep onNext={nextStep} onBack={prevStep} />}
        {step === 8 && <ReviewStep onBack={prevStep} onNext={nextStep} />}
        {step === 9 && <PreApprovalSummary />}
      </div>
    </AutoSaveWrapper>
  );
}
