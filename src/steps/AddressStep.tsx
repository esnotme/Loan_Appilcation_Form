import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "../schemas/addressSchemas";
import type { AddressForm } from "../schemas/addressSchemas";
import { useFormStore } from "../store/formStore";

export default function AddressStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { setAddressInfo } = useFormStore();
  const { register, handleSubmit, formState: { errors } } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = (data: AddressForm) => {
    setAddressInfo(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Address Information</h2>

      <div>
        <label className="block">Street</label>
        <input {...register("street")} className="border p-2 w-full" />
        {errors.street && <p className="text-red-500">{errors.street.message}</p>}
      </div>

      <div>
        <label className="block">City</label>
        <input {...register("city")} className="border p-2 w-full" />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
      </div>

      <div>
        <label className="block">State</label>
        <input {...register("state")} className="border p-2 w-full" />
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}
      </div>

      <div>
        <label className="block">Postal Code</label>
        <input {...register("postalCode")} className="border p-2 w-full" />
        {errors.postalCode && <p className="text-red-500">{errors.postalCode.message}</p>}
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </form>
  );
}
