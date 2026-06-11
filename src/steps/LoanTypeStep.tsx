import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loanTypeSchema } from "../schemas/loanTypeSchemas"; // ✅ new schema
import { useFormStore } from "../store/formStore";

interface Props {
  onNext: () => void;
  onBack?: () => void;
}

export default function LoanTypeStep({ onNext, onBack }: Props) {
  const { loanDetails, setLoanDetails } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loanTypeSchema),
  });

  const onSubmit = (data: any) => {
    setLoanDetails({
      ...loanDetails,
      loanType: data.loanType,
      amount: loanDetails?.amount ?? "",           // ✅ ensure string
      purpose: loanDetails?.purpose ?? "",
      durationMonths: loanDetails?.durationMonths ?? "",
      propertyAddress: loanDetails?.propertyAddress ?? "",
      propertyValue: loanDetails?.propertyValue ?? "",
      registrationNumber: loanDetails?.registrationNumber ?? "",
      turnover: loanDetails?.turnover ?? "",
    });
    onNext();
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <header className="bg-[var(--color-primary)] py-4 px-6">
        <h1 className="text-white text-2xl font-bold">Application Form</h1>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-xl font-bold text-[var(--color-primary)]">
          Select Loan Type
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input type="radio" value="personal" {...register("loanType")} />
              <span>Personal Loan</span>
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" value="home" {...register("loanType")} />
              <span>Home Loan</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="selfEmployed"
                {...register("loanType")}
              />
              <span>Self‑Employed Loan</span>
            </label>
          </div>

          {errors.loanType && (
            <p className="error-text">{errors.loanType.message}</p>
          )}

          <div className="flex gap-2">
            {onBack && (
              <button type="button" onClick={onBack} className="secondary">
                Back
              </button>
            )}
            <button type="submit" className="primary">
              Next
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
