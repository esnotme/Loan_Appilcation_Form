import { useFormStore } from "../store/formStore";

export default function ReviewSubmitStep({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  const { personalInfo, loanDetails, employmentInfo, documentInfo } = useFormStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Review Your Application</h2>

      <div className="border p-4 rounded">
        <h3 className="font-semibold">Personal Information</h3>
        <p>Name: {personalInfo?.fullName}</p>
        <p>Email: {personalInfo?.email}</p>
        <p>Phone: {personalInfo?.phone}</p>
      </div>

      <div className="border p-4 rounded">
        <h3 className="font-semibold">Loan Details</h3>
        <p>Type: {loanDetails?.loanType}</p>
        <p>Amount: {loanDetails?.amount}</p>
        {loanDetails?.purpose && <p>Purpose: {loanDetails.purpose}</p>}
        {loanDetails?.propertyAddress && <p>Property Address: {loanDetails.propertyAddress}</p>}
        {loanDetails?.propertyValue && <p>Property Value: {loanDetails.propertyValue}</p>}
        {loanDetails?.registrationNumber && <p>Business Reg#: {loanDetails.registrationNumber}</p>}
        {loanDetails?.turnover && <p>Annual Turnover: {loanDetails.turnover}</p>}
      </div>

      <div className="border p-4 rounded">
        <h3 className="font-semibold">Employment Information</h3>
        <p>Employer: {employmentInfo?.employer}</p>
        <p>Job Title: {employmentInfo?.jobTitle}</p>
        <p>Income: {employmentInfo?.income}</p>
        <p>Years Employed: {employmentInfo?.yearsEmployed}</p>
        <p>Type: {employmentInfo?.employmentType}</p>
      </div>

      <div className="border p-4 rounded">
        <h3 className="font-semibold">Documents</h3>
        <p>ID Proof: {documentInfo?.idProof}</p>
        <p>Address Proof: {documentInfo?.addressProof}</p>
        <p>Income Proof: {documentInfo?.incomeProof}</p>
        {documentInfo?.salarySlips && <p>Salary Slips: {documentInfo.salarySlips}</p>}
        {documentInfo?.itrDocs && <p>ITR Docs: {documentInfo.itrDocs}</p>}
        {documentInfo?.otherDocs && <p>Other Docs: {documentInfo.otherDocs}</p>}
      </div>

      <div className="flex gap-2">
        <button onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        <button onClick={onSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Submit Application</button>
      </div>
    </div>
  );
}
