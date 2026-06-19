import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loanTypeSchema } from "../schemas/loanSchemas";
import { useFormStore } from "../store/formStore";
import Layout from "../components/layout";

interface Props {
  onNext: () => void;
}

export default function LoanTypeStep({ onNext }: Props) {
  const setLoanType = useFormStore((state) => state.setLoanType);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loanTypeSchema),
  });

  const onSubmit = (data: any) => {
    setLoanType(data.loanType);
    onNext();
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg border-2 border-blue-400"
      >
        <h2 className="text-xl font-bold text-blue-900">
          Select Loan Type
        </h2>

        <label className="flex items-center gap-2">
          <input type="radio" value="personal" {...register("loanType")} />
          Personal
        </label>

        <label className="flex items-center gap-2">
          <input type="radio" value="home" {...register("loanType")} />
          Home
        </label>

        <label className="flex items-center gap-2">
          <input type="radio" value="business" {...register("loanType")} />
          Business
        </label>

        {errors.loanType && (
          <p className="text-red-600 text-sm">
            {errors.loanType.message as string}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next →
          </button>
        </div>
      </form>
    </Layout>
  );
}