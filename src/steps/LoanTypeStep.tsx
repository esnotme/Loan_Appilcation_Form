import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loanTypeSchema } from "../schemas/loanTypeSchemas";
import { useFormStore } from "../store/formStore";
import Layout from "../components/layout";


interface Props {
  onNext: () => void;
}

export default function LoanTypeStep({ onNext }: Props) {
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
      amount: loanDetails?.amount || "",
      purpose: loanDetails?.purpose || "",
      durationMonths: loanDetails?.durationMonths || "",
      propertyAddress: loanDetails?.propertyAddress || "",
      propertyValue: loanDetails?.propertyValue || "",
      registrationNumber: loanDetails?.registrationNumber || "",
      turnover: loanDetails?.turnover || "",
    });
    onNext();
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg border-2 border-blue-400"
      >
        <h2 className="text-xl font-bold text-blue-900">Select Loan Type</h2>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="radio" value="personal" {...register("loanType")} />
            <span>Personal</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" value="business" {...register("loanType")} />
            <span>Business</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" value="home" {...register("loanType")} />
            <span>Home</span>
          </label>
        </div>

        {errors.loanType && (
          <p className="text-red-600 text-sm">{errors.loanType.message}</p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Next →
          </button>
        </div>
      </form>
    </Layout>
  );
}
