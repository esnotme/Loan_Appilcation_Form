import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employmentSchema } from "../schemas/employmentSchemas";
import { useFormStore } from "../store/formStore";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function EmploymentStep({ onNext, onBack }: Props) {
  const { setEmploymentInfo } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employmentSchema),
  });

  const onSubmit = (data: any) => {
    setEmploymentInfo(data);
    onNext();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Dark blue header bar */}
      <header className="bg-blue-900 py-4 px-6">
        <h1 className="text-white text-2xl font-bold">Application Form</h1>
      </header>

      {/* Centered card */}
      <main className="flex-1 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl space-y-6 bg-white p-8 rounded-lg shadow-lg border-2 border-blue-400"
        >
          <h2 className="text-xl font-bold text-blue-900">
            Employment Information
          </h2>

          <div>
            <label className="block mb-1 font-medium">Employment Type</label>
            <select {...register("employmentType")} className="w-full border rounded p-2">
              <option value="">Select type</option>
              <option value="salaried">Salaried</option>
              <option value="selfEmployed">Self‑Employed</option>
            </select>
            {errors.employmentType && (
              <p className="text-red-600 text-sm">{errors.employmentType.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Employer Name</label>
            <input {...register("employer")} className="w-full border rounded p-2" />
            {errors.employer && (
              <p className="text-red-600 text-sm">{errors.employer.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Job Title</label>
            <input {...register("jobTitle")} className="w-full border rounded p-2" />
            {errors.jobTitle && (
              <p className="text-red-600 text-sm">{errors.jobTitle.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Monthly Income</label>
            <input type="number" {...register("income")} className="w-full border rounded p-2" />
            {errors.income && (
              <p className="text-red-600 text-sm">{errors.income.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Years Employed</label>
            <input type="number" {...register("yearsEmployed")} className="w-full border rounded p-2" />
            {errors.yearsEmployed && (
              <p className="text-red-600 text-sm">{errors.yearsEmployed.message}</p>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onBack} className="secondary">
              Back
            </button>
            <button type="submit" className="primary">
              Next
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

