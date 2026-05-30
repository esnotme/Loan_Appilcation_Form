import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loanTypeSchema } from "../schemas/loanSchemas";
import { useFormStore } from "../store/formStore";

type LoanTypeForm = {
  loanType: "Personal" | "Home" | "Business";
};

export default function LoanTypeStep({ onNext }: { onNext: () => void }) {
  const { setLoanType } = useFormStore();
  const { register, handleSubmit, formState: { errors } } = useForm<LoanTypeForm>({
    resolver: zodResolver(loanTypeSchema),
  });

  const onSubmit = (data: LoanTypeForm) => {
    setLoanType(data.loanType);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Select Loan Type</h2>
      <div className="flex flex-col gap-2">
        <label>
          <input type="radio" value="Personal" {...register("loanType")} /> Personal Loan
        </label>
        <label>
          <input type="radio" value="Home" {...register("loanType")} /> Home Loan
        </label>
        <label>
          <input type="radio" value="Business" {...register("loanType")} /> Business Loan
        </label>
      </div>
      {errors.loanType && <p className="text-red-500">{errors.loanType.message}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Next
      </button>
    </form>
  );
}
