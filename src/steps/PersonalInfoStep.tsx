import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "../schemas/personalSchemas";
import { verificationSchema } from "../schemas/panAadhaarSchemas";
import type { PersonalInfoForm } from "../schemas/personalSchemas";
import type { VerificationForm } from "../schemas/panAadhaarSchemas";
import { useFormStore } from "../store/formStore";

export default function PersonalInfoStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { setPersonalInfo, setVerificationInfo } = useFormStore();
  const [panVerified, setPanVerified] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<PersonalInfoForm & VerificationForm>({
    resolver: zodResolver(personalInfoSchema.merge(verificationSchema)),
  });

  const simulateVerification = (field: "pan" | "aadhaar") => {
    const value = getValues(field);
    setTimeout(() => {
      if (field === "pan" && verificationSchema.shape.pan.safeParse(value).success) {
        setPanVerified(true);
      }
      if (field === "aadhaar" && verificationSchema.shape.aadhaar.safeParse(value).success) {
        setAadhaarVerified(true);
      }
    }, 1500);
  };

  const onSubmit = (data: PersonalInfoForm & VerificationForm) => {
    if (panVerified && aadhaarVerified) {
      setPersonalInfo({
        fullName: data.fullName,
        dob: data.dob,
        email: data.email,
        phone: data.phone,
      });
      setVerificationInfo({ pan: data.pan, aadhaar: data.aadhaar, panVerified, aadhaarVerified });
      onNext();
    } else {
      alert("Please verify PAN and Aadhaar before continuing.");
    }
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
        <label className="block">Date of Birth</label>
        <input type="date" {...register("dob")} className="border p-2 w-full" />
        {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
      </div>

      <div>
        <label className="block">Email</label>
        <input type="email" {...register("email")} className="border p-2 w-full" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block">Phone</label>
        <input {...register("phone")} className="border p-2 w-full" />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block">PAN</label>
        <input {...register("pan")} className="border p-2 w-full" />
        {errors.pan && <p className="text-red-500">{errors.pan.message}</p>}
        <button type="button" onClick={() => simulateVerification("pan")} className="bg-blue-500 text-white px-2 py-1 rounded mt-2">
          Verify PAN
        </button>
        {panVerified && <span className="text-green-600 ml-2">✔ Verified</span>}
      </div>

      <div>
        <label className="block">Aadhaar</label>
        <input {...register("aadhaar")} className="border p-2 w-full" />
        {errors.aadhaar && <p className="text-red-500">{errors.aadhaar.message}</p>}
        <button type="button" onClick={() => simulateVerification("aadhaar")} className="bg-blue-500 text-white px-2 py-1 rounded mt-2">
          Verify Aadhaar
        </button>
        {aadhaarVerified && <span className="text-green-600 ml-2">✔ Verified</span>}
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">
          Back
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </form>
  );
}
