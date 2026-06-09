import { useFormStore } from "../store/formStore";

export default function ReviewStep({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const {
    loanType,
    personalInfo,
    employmentInfo,
    loanDetails,
    coApplicantInfo,
    addressInfo,
    documentInfo,
    signatureInfo,
  } = useFormStore();

  const handleSubmit = () => {
    // TODO: integrate submission logic (API call, etc.)
    alert("Application submitted successfully!");
    onNext(); // move to PreApprovalSummary after submit
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Review & Summary</h2>

      <div className="space-y-2">
        <h3 className="font-semibold">Loan Type</h3>
        <p>{loanType}</p>

        <h3 className="font-semibold">Personal Info</h3>
        <p>
          {personalInfo?.fullName} | {personalInfo?.dob} | {personalInfo?.email} | {personalInfo?.phone}
        </p>

        <h3 className="font-semibold">Employment Info</h3>
        <p>
          {employmentInfo?.employer} | {employmentInfo?.jobTitle} | {employmentInfo?.income} | {employmentInfo?.yearsEmployed}
        </p>

        <h3 className="font-semibold">Loan Details</h3>
        <p>
          {loanDetails?.amount} | {loanDetails?.purpose} | {loanDetails?.durationMonths} months
        </p>

        <h3 className="font-semibold">Co-Applicant Info</h3>
        <p>
          {coApplicantInfo?.fullName} | {coApplicantInfo?.relationship} | {coApplicantInfo?.email} | {coApplicantInfo?.phone}
        </p>

        <h3 className="font-semibold">Address Info</h3>
        <p>
          {addressInfo?.street}, {addressInfo?.city}, {addressInfo?.state}, {addressInfo?.postalCode}
        </p>

        <h3 className="font-semibold">Documents</h3>
        <p>
          ID: {documentInfo?.idProof} | Income: {documentInfo?.incomeProof} | Address: {documentInfo?.addressProof}
        </p>

        <h3 className="font-semibold">Signature</h3>
        <p>
          {signatureInfo?.signature} (Agreed: {signatureInfo?.agree ? "Yes" : "No"})
        </p>
      </div>

      <div className="flex gap-2">
        <button onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">
          Back
        </button>
        <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
}
