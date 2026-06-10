import { useFormStore } from "../store/formStore";
import { useState } from "react";

interface Props {
  onSubmit: () => void;
  onBack: () => void;
}

export default function ReviewStep({ onSubmit, onBack }: Props) {
  const {
    personalInfo,
    verificationInfo,
    coApplicantInfo,
    employmentInfo,
    addressInfo,
    documentInfo,
    signatureInfo,
    loanType,
    loanDetails,
  } = useFormStore();

  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold text-[var(--color-primary)]">
        Review Your Application
      </h2>

      {/* Personal Info */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection("personal")}
          className="w-full text-left font-semibold border-b py-2"
        >
          Personal Information
        </button>
        {openSection === "personal" && (
          <div className="pl-4 text-sm space-y-1">
            <p>Name: {personalInfo?.fullName}</p>
            <p>DOB: {personalInfo?.dob}</p>
            <p>Email: {personalInfo?.email}</p>
            <p>Phone: {personalInfo?.phone}</p>
          </div>
        )}
      </div>

      {/* Verification */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection("verification")}
          className="w-full text-left font-semibold border-b py-2"
        >
          Verification
        </button>
        {openSection === "verification" && (
          <div className="pl-4 text-sm space-y-1">
            <p>PAN: {verificationInfo?.pan}</p>
            <p>Aadhaar: {verificationInfo?.aadhaar}</p>
          </div>
        )}
      </div>

      {/* Co-Applicant */}
      {coApplicantInfo && (
        <div>
          <button
            type="button"
            onClick={() => toggleSection("coApplicant")}
            className="w-full text-left font-semibold border-b py-2"
          >
            Co-Applicant
          </button>
          {openSection === "coApplicant" && (
            <div className="pl-4 text-sm space-y-1">
              <p>Name: {coApplicantInfo.fullName}</p>
              <p>Relationship: {coApplicantInfo.relationship}</p>
              <p>Email: {coApplicantInfo.email}</p>
              <p>Phone: {coApplicantInfo.phone}</p>
            </div>
          )}
        </div>
      )}

      {/* Employment */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection("employment")}
          className="w-full text-left font-semibold border-b py-2"
        >
          Employment
        </button>
        {openSection === "employment" && (
          <div className="pl-4 text-sm space-y-1">
            <p>Type: {employmentInfo?.employmentType}</p>
            <p>Employer: {employmentInfo?.employer}</p>
            <p>Job Title: {employmentInfo?.jobTitle}</p>
            <p>Income: {employmentInfo?.income}</p>
            <p>Years Employed: {employmentInfo?.yearsEmployed}</p>
          </div>
        )}
      </div>

      {/* Address */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection("address")}
          className="w-full text-left font-semibold border-b py-2"
        >
          Address
        </button>
        {openSection === "address" && (
          <div className="pl-4 text-sm space-y-1">
            <p>Street: {addressInfo?.street}</p>
            <p>Postal Code: {addressInfo?.postalCode}</p>
            <p>City: {addressInfo?.city}</p>
            <p>State: {addressInfo?.state}</p>
          </div>
        )}
      </div>

      {/* Documents */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection("documents")}
          className="w-full text-left font-semibold border-b py-2"
        >
          Documents
        </button>
        {openSection === "documents" && (
          <div className="pl-4 text-sm space-y-1">
            <p>ID Proof: {documentInfo?.idProof}</p>
            <p>Income Proof: {documentInfo?.incomeProof}</p>
            <p>Address Proof: {documentInfo?.addressProof}</p>
          </div>
        )}
      </div>

      {/* Signature */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection("signature")}
          className="w-full text-left font-semibold border-b py-2"
        >
          Signature
        </button>
        {openSection === "signature" && signatureInfo?.signature && (
          <div className="pl-4">
            <img
              src={signatureInfo.signature}
              alt="Signature"
              className="h-24 border rounded"
            />
          </div>
        )}
      </div>

      {/* Loan Details */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection("loan")}
          className="w-full text-left font-semibold border-b py-2"
        >
          Loan Details
        </button>
        {openSection === "loan" && (
          <div className="pl-4 text-sm space-y-1">
            <p>Type: {loanType}</p>
            <p>Amount: {loanDetails?.amount}</p>
            <p>Tenure: {loanDetails?.durationMonths} months</p>
            <p>Purpose: {loanDetails?.purpose}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="secondary">
          Back
        </button>
        <button type="button" onClick={onSubmit} className="primary">
          Submit Application
        </button>
      </div>
    </div>
  );
}
