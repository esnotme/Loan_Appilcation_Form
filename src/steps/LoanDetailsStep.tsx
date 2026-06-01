import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loanDetailsSchema } from "../schemas/loanDetailsSchemas";
import type { LoanDetailsForm } from "../schemas/loanDetailsSchemas";
import { useFormStore } from "../store/formStore";

export default function LoanDetailsStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { setLoanDetails } = useFormStore();
  const { register, handleSubmit, formState: { errors } } = useForm<LoanDetailsForm>({
    resolver: zodResolver(loanDetailsSchema),
  });

  const onSubmit = (data: LoanDetailsForm) => {
    setLoanDetails(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Loan Details</h2>

      <div>
        <label className="block">Loan Amount</label>
        <input {...register("amount")} className="border p-2 w-full" />
        {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
      </div>

      <div>
        <label className="block">Purpose</label>
        <input {...register("purpose")} className="border p-2 w-full" />
        {errors.purpose && <p className="text-red-500">{errors.purpose.message}</p>}
      </div>

      <div>
        <label className="block">Duration (Months)</label>
        <input {...register("durationMonths")} className="border p-2 w-full" />
        {errors.durationMonths && <p className="text-red-500">{errors.durationMonths.message}</p>}
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </form>
  );
}
