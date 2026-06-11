import { useFormStore } from "../store/formStore";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function ReviewStep({ onNext, onBack }: Props) {
  const { loanDetails, personalInfo, employmentInfo, addressInfo } = useFormStore();

  const handleSubmit = () => {
    // ✅ For demo: just move to PreApprovalSummary
    onNext();
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header bar */}
      <header className="bg-[var(--color-primary)] py-4 px-6">
        <h1 className="text-white text-2xl font-bold">Application Form</h1>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-xl font-bold text-[var(--color-primary)]">
          Review Your Information
        </h2>

        {/* Applicant */}
        <section className="border-b pb-4">
          <h3 className="font-semibold text-gray-700">Personal Info</h3>
          <p>{personalInfo?.fullName}</p>
          <p>{personalInfo?.email}</p>
          <p>{personalInfo?.phone}</p>
        </section>

        {/* Employment */}
        <section className="border-b pb-4">
          <h3 className="font-semibold text-gray-700">Employment</h3>
          <p>Type: {employmentInfo?.employmentType}</p>
          <p>Employer: {employmentInfo?.employer}</p>
          <p>Job Title: {employmentInfo?.jobTitle}</p>
          <p>Income: {employmentInfo?.income}</p>
        </section>

        {/* Address */}
        <section className="border-b pb-4">
          <h3 className="font-semibold text-gray-700">Address</h3>
          <p>{addressInfo?.street}</p>
          <p>{addressInfo?.city}, {addressInfo?.state}</p>
          <p>{addressInfo?.postalCode}</p>
        </section>

        {/* Loan Details */}
        <section className="border-b pb-4">
          <h3 className="font-semibold text-gray-700">Loan Details</h3>
          <p>Amount: ₹{loanDetails?.amount}</p>
          <p>Tenure: {loanDetails?.durationMonths} months</p>
          <p>Purpose: {loanDetails?.purpose}</p>
        </section>

        {/* Navigation */}
        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onBack} className="secondary">
            Back
          </button>
          <button type="button" onClick={handleSubmit} className="primary">
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
