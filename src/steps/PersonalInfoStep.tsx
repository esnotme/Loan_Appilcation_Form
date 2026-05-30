import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "../schemas/personalSchemas";
import type { PersonalInfoForm } from "../schemas/personalSchemas";

import { useFormStore } from "../store/formStore";

export default function PersonalInfoStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { setPersonalInfo } = useFormStore();
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
  });

  const onSubmit = (data: PersonalInfoForm) => {
    setPersonalInfo(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Personal Information</h2>

      <div>
        <label className="block">Full Name</label>
        <input {...register("fullName")} className="border p-2 w-full" />
        {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="block">Date of Birth (YYYY-MM-DD)</label>
        <input {...register("dob")} className="border p-2 w-full" />
        {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
      </div>

      <div>
        <label className="block">Email</label>
        <input {...register("email")} className="border p-2 w-full" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block">Phone</label>
        <input {...register("phone")} className="border p-2 w-full" />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </form>
  );
}
