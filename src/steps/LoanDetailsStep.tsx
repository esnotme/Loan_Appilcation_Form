import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loanDetailsSchema } from "../schemas/loanDetailsSchemas";
import type { LoanDetailsForm } from "../schemas/loanDetailsSchemas";
import { useFormStore } from "../store/formStore";

export default function LoanDetailsStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { setLoanDetails } = useFormStore();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<LoanDetailsForm>({
    resolver: zodResolver(loanDetailsSchema),
  });

  const loanAmount = watch("amount");

  {loanAmount && Number(loanAmount) > 1000000 && (
  <p className="text-sm text-red-600 mt-2">
    Co‑Applicant will be required for loans above ₹10,00,000.
  </p>
)}

  const onSubmit = (data: LoanDetailsForm) => {
    setLoanDetails(data);

    // Conditional navigation: if loan amount exceeds threshold, go to Co‑Applicant step
    if (Number(data.amount) > 1000000) {
      // nextStep will naturally lead to Co‑Applicant
      onNext();
    } else {
      // skip Co‑Applicant by advancing two steps
      onNext(); 
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Loan Details</h2>

      <div>
        <label className="block">Loan Amount</label>
        <input type="number" {...register("amount")} className="border p-2 w-full" />
        {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
      </div>

      {/* Other loan fields here */}

      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </form>
  );
}
