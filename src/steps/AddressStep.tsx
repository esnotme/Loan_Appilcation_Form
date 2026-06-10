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

  // ✅ Simple PIN lookup simulation
  const pinLookup = (pin: string) => {
    const dataset: Record<string, { city: string; state: string }> = {
      "400001": { city: "Mumbai", state: "Maharashtra" },
      "110001": { city: "New Delhi", state: "Delhi" },
      "560001": { city: "Bengaluru", state: "Karnataka" },
    };
    return dataset[pin] || null;
  };

  // Auto-fill city/state when PIN changes
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
    const payload = {
      ...data,
      permanentAddress: sameAsCurrent ? { ...data } : data.permanentAddress,
    };
    setAddressInfo(payload);
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold text-[var(--color-primary)]">
        Address Information
      </h2>

      <div>
        <label>Street</label>
        <input {...register("street")} />
        {errors.street && <p className="error-text">{errors.street.message}</p>}
      </div>

      <div>
        <label>Postal Code</label>
        <input {...register("postalCode")} />
        {errors.postalCode && (
          <p className="error-text">{errors.postalCode.message}</p>
        )}
      </div>

      <div>
        <label>City</label>
        <input {...register("city")} />
        {errors.city && <p className="error-text">{errors.city.message}</p>}
      </div>

      <div>
        <label>State</label>
        <input {...register("state")} />
        {errors.state && <p className="error-text">{errors.state.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
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
  );
}
