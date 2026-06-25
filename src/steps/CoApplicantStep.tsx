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
    <div className="min-h-screen bg-[var(--color-bg)] step co-applicant-step">
      {/* Header bar */}
      <header className="step-header bg-[var(--color-primary)] py-4 px-6">
        <h1 className="text-white text-2xl font-bold">Application Form</h1>
      </header>

      {/* Main form content */}
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-xl font-bold text-[var(--color-primary)]">
  Co-Applicant Information
</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="step-form space-y-6">
          {/* Toggle */}
          <div className="field toggle-field flex items-center gap-2">
            <label htmlFor="hasCoApplicant">Add a co‑applicant</label>
            <input
              id="hasCoApplicant"
              type="checkbox"
              title="Add a co-applicant"
              checked={hasCoApplicant}
              onChange={(e) => setHasCoApplicant(e.target.checked)}
            />
          </div>

          {/* Conditional fields */}
          {hasCoApplicant && (
            <div className="conditional-fields space-y-4">
              <div className="field">
                <label htmlFor="fullName">Full Name</label>
                <input id="fullName" placeholder="Full name" {...register("fullName")} />
                {errors.fullName && (
                  <p className="error-text">{errors.fullName.message}</p>
                )}
              </div>

              <div className="field">
                <label htmlFor="relationship">Relationship</label>
                <input id="relationship" placeholder="e.g. Spouse, Parent" {...register("relationship")} />
                {errors.relationship && (
                  <p className="error-text">{errors.relationship.message}</p>
                )}
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="name@example.com" {...register("email")} />
                {errors.email && (
                  <p className="error-text">{errors.email.message}</p>
                )}
              </div>

              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="tel" placeholder="(555) 555-5555" {...register("phone")} />
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
