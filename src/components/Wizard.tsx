import { useState } from "react";
import LoanTypeStep from "../steps/LoanTypeStep";
import PersonalInfoStep from "../steps/PersonalInfoStep";
import EmploymentStep from "../steps/EmploymentStep";

export default function Wizard() {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      {step === 0 && <LoanTypeStep onNext={nextStep} />}
      {step === 1 && <PersonalInfoStep onNext={nextStep} onBack={prevStep} />}
      {step === 2 && <EmploymentStep onNext={nextStep} onBack={prevStep} />}
    </div>
  );
}
