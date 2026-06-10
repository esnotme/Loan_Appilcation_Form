import { useFormStore } from "../store/formStore";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function ReviewStep({ onNext, onBack }: Props) {
  const {
    loanType,
    personalInfo,
    employmentInfo,
    loanDetails,
    coApplicantInfo,
    addressInfo,
    documentInfo,
    signatureInfo,
    verificationInfo, // ✅ added
  } = useFormStore();

  return (
    <div className="space-y-6 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold text-[var(--color-primary)]">
        Review Your Application
      </h2>

      {/* Loan Type */}
      <section className="border-b pb-4">
        <h3 className="font-semibold text-gray-700">Loan Type</h3>
        <p>{loanType}</p>
      </section>

      {/* Personal Info */}
      <section className="border-b pb-4">
        <h3 className="font-semibold text-gray-700">Personal Information</h3>
        <p>{personalInfo?.fullName}</p>
        <p>{personalInfo?.email}</p>
        <p>{personalInfo?.phone}</p>
        <p>PAN: {verificationInfo?.pan}</p> {/* ✅ fixed */}
        <p>Aadhaar: {verificationInfo?.aadhaar}</p> {/* ✅ fixed */}
      </section>

      {/* Employment */}
      <section className="border-b pb-4">
        <h3 className="font-semibold text-gray-700">Employment</h3>
        <p>{employmentInfo?.employmentType}</p>
        <p>{employmentInfo?.employer}</p> {/* ✅ fixed */}
        <p>Income: ₹{employmentInfo?.income}</p>
      </section>

      {/* Loan Details */}
<section className="border-b pb-4">
  <h3 className="font-semibold text-gray-700">Loan Details</h3>
  <p>Amount: ₹{loanDetails?.amount}</p>
  <p>Tenure: {loanDetails?.durationMonths} months</p> {/* ✅ use correct property */}
  <p>Purpose: {loanDetails?.purpose}</p>
</section>


      {/* Co-Applicant */}
      {coApplicantInfo?.fullName && (
        <section className="border-b pb-4">
          <h3 className="font-semibold text-gray-700">Co‑Applicant</h3>
          <p>{coApplicantInfo?.fullName}</p>
          <p>{coApplicantInfo?.relationship}</p>
        </section>
      )}

      {/* Address */}
      <section className="border-b pb-4">
        <h3 className="font-semibold text-gray-700">Address</h3>
        <p>{addressInfo?.street}, {addressInfo?.city}, {addressInfo?.state}</p>
        <p>PIN: {addressInfo?.postalCode}</p>
      </section>

      {/* Documents */}
      <section className="border-b pb-4">
        <h3 className="font-semibold text-gray-700">Documents</h3>
        <ul className="list-disc pl-5">
          {documentInfo?.idProof && <li>ID Proof: {documentInfo.idProof}</li>}
          {documentInfo?.incomeProof && <li>Income Proof: {documentInfo.incomeProof}</li>}
          {documentInfo?.addressProof && <li>Address Proof: {documentInfo.addressProof}</li>}
        </ul>
      </section>

      {/* Signature */}
      <section>
        <h3 className="font-semibold text-gray-700">Signature</h3>
        {signatureInfo?.signature ? (
          <img
            src={signatureInfo.signature}
            alt="Signature preview"
            className="border rounded h-24"
          />
        ) : (
          <p>No signature provided</p>
        )}
      </section>

      {/* Navigation */}
      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="secondary">
          Back
        </button>
        <button type="button" onClick={onNext} className="primary">
          Confirm & Submit
        </button>
      </div>
    </div>
  );
}
