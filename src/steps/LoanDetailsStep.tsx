import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loanDetailsSchema } from "../schemas/loanDetailsSchemas";
import { useFormStore } from "../store/formStore";
import { useState, useEffect } from "react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function LoanDetailsStep({ onNext, onBack }: Props) {
  const { setLoanDetails } = useFormStore();
  const [emi, setEmi] = useState<number>(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loanDetailsSchema),
  });

  const amount = Number(watch("amount") || 0);
  const months = Number(watch("durationMonths") || 0);
  const interestRate = 0.12; // 12% annual
  const monthlyRate = interestRate / 12;

  useEffect(() => {
    if (amount > 0 && months > 0) {
      const calcEmi =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      setEmi(calcEmi);
    } else {
      setEmi(0);
    }
  }, [amount, months]);

  const onSubmit = (data: any) => {
    setLoanDetails(data);
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold text-[var(--color-primary)]">
        Loan Details
      </h2>

      <div>
        <label>Loan Amount</label>
        <input type="number" {...register("amount")} />
        {errors.amount && <p className="error-text">{errors.amount.message}</p>}
      </div>

      <div>
        <label>Tenure (months)</label>
        <input type="number" {...register("durationMonths")} />
        {errors.durationMonths && <p className="error-text">{errors.durationMonths.message}</p>}
      </div>

      <div>
        <label>Purpose</label>
        <input {...register("purpose")} />
        {errors.purpose && <p className="error-text">{errors.purpose.message}</p>}
      </div>

      {/* ✅ Live EMI preview */}
      <div className="bg-gray-50 p-4 rounded">
        <p className="text-sm text-gray-600">Estimated EMI:</p>
        <p className="text-lg font-semibold text-[var(--color-primary)]">
          ₹{emi.toFixed(2)}
        </p>
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="secondary">
          Back
        </button>
        <button type="submit" className="primary">
          Next
        </button>
      </div>
    </form>
  );
}
