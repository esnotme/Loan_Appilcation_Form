export default function PreApprovalSummary() {
  // In a real app, pull loanDetails from your store
  const loanDetails = { amount: 100000, durationMonths: 12 };
  const interestRate = 0.12;
  const tenureMonths = loanDetails.durationMonths;
  const principal = loanDetails.amount;

  const emi = (principal * interestRate / 12) /
              (1 - Math.pow(1 + interestRate / 12, -tenureMonths));
  const totalCost = emi * tenureMonths;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Pre-Approval Summary</h2>
      <p>Loan Amount: {principal}</p>
      <p>Tenure: {tenureMonths} months</p>
      <p>Interest Rate: {interestRate * 100}%</p>
      <p>EMI: {emi.toFixed(2)}</p>
      <p>Total Cost: {totalCost.toFixed(2)}</p>
      <p>Cooling-off period: 7 days</p>
      <p>Grievance Officer: officer@example.com</p>
      <p>RBI Ombudsman: https://rbi.org.in/ombudsman</p>
    </div>
  );
}
