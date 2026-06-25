import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "../schemas/addressSchemas";
import { useFormStore } from "../store/formStore";
import { useState, useEffect } from "react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function AddressStep({ onNext, onBack }: Props) {
  const { setAddressInfo } = useFormStore();
  const [sameAsCurrent, setSameAsCurrent] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
  });

  const pin = watch("postalCode");

  const pinLookup = (pin: string) => {
    const dataset: Record<string, { city: string; state: string }> = {
      "400001": { city: "Mumbai", state: "Maharashtra" },
      "110001": { city: "New Delhi", state: "Delhi" },
      "560001": { city: "Bengaluru", state: "Karnataka" },
    };
    return dataset[pin] || null;
  };

  useEffect(() => {
    if (pin && pin.length === 6) {
      const result = pinLookup(pin);
      if (result) {
        setValue("city", result.city);
        setValue("state", result.state);
      }
    }
  }, [pin, setValue]);

  const onSubmit = (data: any) => {
    setAddressInfo({
      ...data,
      permanentAddress: sameAsCurrent ? data : null,
    });

    onNext();
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] step address-step">
      <header className=" step-header bg-[var(--color-primary)] py-4 px-6">
        <h1 className="text-white text-2xl font-bold">Application Form</h1>
      </header>

      <main className="step-container max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="step-title text-xl font-bold text-[var(--color-primary)]">
          Address Information
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="step-form space-y-6">
          <div className="field">
            <label>Street</label>
            <input placeholder="Enter street" {...register("street")} />
            {errors.street && <p>{errors.street.message}</p>}
          </div>

          <div className="field">
            <label>Postal Code</label>
            <input placeholder="Enter postal code" {...register("postalCode")} />
            {errors.postalCode && <p>{errors.postalCode.message}</p>}
          </div>

          <div className="field">
            <label>City</label>
            <input placeholder="Auto-filled city" {...register("city")} />
          </div>

          <div className="field">
            <label>State</label>
            <input placeholder="Auto-filled state" {...register("state")} />
          </div>

          <div className="flex items-center gap-2">
            <label>Permanent Address</label>
            <input
              type="checkbox"
              title="Permanent address same as current"
              checked={sameAsCurrent}
              onChange={(e) => setSameAsCurrent(e.target.checked)}
            />
            <span>Permanent address same as current</span>
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
      </main>
    </div>
  );
}