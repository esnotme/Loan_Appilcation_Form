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

  const loanType = watch("loanType");

  const onSubmit = (data: LoanDetailsForm) => {
    setLoanDetails(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Loan Details</h2>

      <div>
        <label className="block">Loan Type</label>
        <select {...register("loanType")} className="border p-2 w-full">
          <option value="">Select...</option>
          <option value="Personal">Personal</option>
          <option value="Home">Home</option>
          <option value="Business">Business</option>
        </select>
        {errors.loanType && <p className="text-red-500">{errors.loanType.message}</p>}
      </div>

      <div>
        <label className="block">Loan Amount</label>
        <input type="number" {...register("amount")} className="border p-2 w-full" />
        {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
      </div>

      {/* Conditional fields */}
      {loanType === "Personal" && (
        <div>
          <label className="block">Purpose</label>
          <input {...register("purpose")} className="border p-2 w-full" />
          {errors.purpose && <p className="text-red-500">{errors.purpose.message}</p>}
        </div>
      )}

      {loanType === "Home" && (
        <>
          <div>
            <label className="block">Property Address</label>
            <input {...register("propertyAddress")} className="border p-2 w-full" />
            {errors.propertyAddress && <p className="text-red-500">{errors.propertyAddress.message}</p>}
          </div>
          <div>
            <label className="block">Property Value</label>
            <input type="number" {...register("propertyValue")} className="border p-2 w-full" />
            {errors.propertyValue && <p className="text-red-500">{errors.propertyValue.message}</p>}
          </div>
        </>
      )}

      {loanType === "Business" && (
        <>
          <div>
            <label className="block">Business Registration Number</label>
            <input {...register("registrationNumber")} className="border p-2 w-full" />
            {errors.registrationNumber && <p className="text-red-500">{errors.registrationNumber.message}</p>}
          </div>
          <div>
            <label className="block">Annual Turnover</label>
            <input type="number" {...register("turnover")} className="border p-2 w-full" />
            {errors.turnover && <p className="text-red-500">{errors.turnover.message}</p>}
          </div>
        </>
      )}

      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </form>
  );
}
