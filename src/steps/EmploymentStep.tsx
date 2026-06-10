import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employmentSchema } from "../schemas/employmentSchemas";
import { useFormStore } from "../store/formStore";
import { useState } from "react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function EmploymentStep({ onNext, onBack }: Props) {
  const { setEmploymentInfo } = useFormStore();
  const [employmentType, setEmploymentType] = useState<"Salaried" | "Self-Employed" | "Other">("Salaried");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employmentSchema),
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    setEmploymentInfo({
      employmentType,
      employer: data.employer || "",
      jobTitle: data.jobTitle || "",
      income: data.income || "",
      yearsEmployed: data.yearsEmployed || "",
    });
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold text-[var(--color-primary)]">
        Employment Information
      </h2>

      {/* Employment Type Selector */}
      <div>
        <label>Employment Type</label>
        <select
          value={employmentType}
          onChange={(e) => setEmploymentType(e.target.value as any)}
          className="border rounded p-2 w-full"
        >
          <option value="Salaried">Salaried</option>
          <option value="Self-Employed">Self-Employed</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Conditional Fields */}
      {employmentType === "Salaried" && (
        <>
          <div>
            <label>Employer Name</label>
            <input {...register("employer")} />
            {errors.employer && <p className="error-text">{errors.employer.message}</p>}
          </div>

          <div>
            <label>Job Title</label>
            <input {...register("jobTitle")} />
            {errors.jobTitle && <p className="error-text">{errors.jobTitle.message}</p>}
          </div>

          <div>
            <label>Monthly Income</label>
            <input type="number" {...register("income")} />
            {errors.income && <p className="error-text">{errors.income.message}</p>}
          </div>

          <div>
            <label>Years Employed</label>
            <input type="number" {...register("yearsEmployed")} />
            {errors.yearsEmployed && <p className="error-text">{errors.yearsEmployed.message}</p>}
          </div>
        </>
      )}

      {employmentType === "Self-Employed" && (
        <p className="text-sm text-gray-600">
          Please upload your ITR documents in the next step.
        </p>
      )}

      {employmentType === "Other" && (
        <p className="text-sm text-gray-600">
          No additional details required for “Other” employment type.
        </p>
      )}

      {/* Navigation */}
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
