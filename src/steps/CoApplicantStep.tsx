import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { coApplicantSchema } from "../schemas/coApplicantSchemas";
import { useFormStore } from "../store/formStore";
import { useState } from "react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function CoApplicantStep({ onNext, onBack }: Props) {
  const { setCoApplicantInfo } = useFormStore();
  const [hasCoApplicant, setHasCoApplicant] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(coApplicantSchema),
  });

  const onSubmit = (data: any) => {
    if (hasCoApplicant) {
      setCoApplicantInfo(data);
    } else {
      setCoApplicantInfo(null); // ✅ no co‑applicant
    }
    onNext();
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header bar */}
      <header className="bg-[var(--color-primary)] py-4 px-6">
        <h1 className="text-white text-2xl font-bold">Application Form</h1>
      </header>

      {/* Main form content */}
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-xl font-bold text-[var(--color-primary)]">
          Co‑Applicant
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Toggle */}
          <div className="flex items-center gap-2">
            <label>Add a co‑applicant</label>
            <input
              type="checkbox"
              checked={hasCoApplicant}
              onChange={(e) => setHasCoApplicant(e.target.checked)}
            />
            <span>Add a co‑applicant</span>
          </div>

          {/* Conditional fields */}
          {hasCoApplicant && (
            <div className="space-y-4">
              <div>
                <label>Full Name</label>
                <input {...register("fullName")} />
                {errors.fullName && (
                  <p className="error-text">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label>Relationship</label>
                <input {...register("relationship")} />
                {errors.relationship && (
                  <p className="error-text">{errors.relationship.message}</p>
                )}
              </div>

              <div>
                <label>Email</label>
                <input type="email" {...register("email")} />
                {errors.email && (
                  <p className="error-text">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label>Phone</label>
                <input type="tel" {...register("phone")} />
                {errors.phone && (
                  <p className="error-text">{errors.phone.message}</p>
                )}
              </div>
            </div>
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
      </main>
    </div>
  );
}
