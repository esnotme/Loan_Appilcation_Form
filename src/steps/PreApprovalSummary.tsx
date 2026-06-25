import { useFormStore } from "../store/formStore";

export default function PreApprovalSummary() {
  const { loanDetails, personalInfo } = useFormStore();

  // ✅ Simple EMI calculation (flat interest assumption for demo)
  const principal = Number(loanDetails?.amount || 0);
  const months = Number(loanDetails?.durationMonths || 0);
  const interestRate = 0.12; // 12% annual
  const monthlyRate = interestRate / 12;
  const emi =
    months > 0
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : 0;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] step summary-step">
      {/* Header bar */}
      <header className="bg-[var(--color-primary)] py-4 px-6">
        <h1 className="text-white text-2xl font-bold">Application Form</h1>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-xl font-bold text-[var(--color-primary)]">
          Pre‑Approval Summary
        </h2>

        {/* Applicant */}
        <section className="summary-section border-b pb-4">
          <h3 className="font-semibold text-gray-700">Applicant</h3>
          <p>{personalInfo?.fullName}</p>
          <p>{personalInfo?.email}</p>
        </section>

        {/* Loan Breakdown */}
        <section className="summary-section border-b pb-4">
          <h3 className="font-semibold text-gray-700">Loan Breakdown</h3>
          <p>Principal: ₹{principal.toLocaleString()}</p>
          <p>Tenure: {months} months</p>
          <p>Estimated EMI: ₹{emi.toFixed(2)}</p>
        </section>

        {/* Compliance */}
        <section className="summary-section border-b pb-4">
          <h3 className="font-semibold text-gray-700">Disclosures</h3>
          <ul className="list-disc pl-5 text-gray-600 text-sm">
            <li>Cooling‑off period: 14 days</li>
            <li>Grievance officer: Mr. R. Sharma (grievance@bank.com)</li>
            <li>Interest rate subject to credit score verification</li>
            <li>Final approval contingent on document verification</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="cta-row flex justify-end">
          <button type="button" className="primary">
            Submit Application
          </button>
        </div>
      </main>
    </div>
  );
}
