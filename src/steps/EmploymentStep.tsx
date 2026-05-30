import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employmentSchema } from "../schemas/employmentSchemas";
import type { EmploymentForm } from "../schemas/employmentSchemas";
import { useFormStore } from "../store/formStore";

export default function EmploymentStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { setEmploymentInfo } = useFormStore();
  const { register, handleSubmit, formState: { errors } } = useForm<EmploymentForm>({
    resolver: zodResolver(employmentSchema),
  });

  const onSubmit = (data: EmploymentForm) => {
    setEmploymentInfo(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Employment Information</h2>

      <div>
        <label className="block">Employer</label>
        <input {...register("employer")} className="border p-2 w-full" />
        {errors.employer && <p className="text-red-500">{errors.employer.message}</p>}
      </div>

      <div>
        <label className="block">Job Title</label>
        <input {...register("jobTitle")} className="border p-2 w-full" />
        {errors.jobTitle && <p className="text-red-500">{errors.jobTitle.message}</p>}
      </div>

      <div>
        <label className="block">Monthly Income</label>
        <input {...register("income")} className="border p-2 w-full" />
        {errors.income && <p className="text-red-500">{errors.income.message}</p>}
      </div>

      <div>
        <label className="block">Years Employed</label>
        <input {...register("yearsEmployed")} className="border p-2 w-full" />
        {errors.yearsEmployed && <p className="text-red-500">{errors.yearsEmployed.message}</p>}
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </form>
  );
}
