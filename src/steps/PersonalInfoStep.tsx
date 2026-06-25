import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "../schemas/personalSchemas";
import { verificationSchema } from "../schemas/panAadhaarSchemas";
import { useFormStore } from "../store/formStore";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function PersonalInfoStep({ onNext, onBack }: Props) {
  const { setPersonalInfo, setVerificationInfo } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      personalInfoSchema.merge(verificationSchema)
    ),
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    setPersonalInfo({
      fullName: data.fullName,
      dob: data.dob,
      email: data.email,
      phone: data.phone,
    });
    setVerificationInfo({
      pan: data.pan,
      aadhaar: data.aadhaar,
      panVerified: false,
      aadhaarVerified: false,
    });
    onNext();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col personal-step">
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
            Personal Information
          </h2>

          <div className="field">
            <label className="block mb-1 font-medium">Full Name</label>
            <input {...register("fullName")} className="w-full border rounded p-2" />
            {errors.fullName && (
              <p className="text-red-600 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div className="field">
            <label className="block mb-1 font-medium">Date of Birth</label>
            <input type="date" {...register("dob")} className="w-full border rounded p-2" />
            {errors.dob && <p className="text-red-600 text-sm">{errors.dob.message}</p>}
          </div>

          <div className="field">
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" {...register("email")} className="w-full border rounded p-2" />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="field">
            <label className="block mb-1 font-medium">Phone</label>
            <input type="tel" {...register("phone")} className="w-full border rounded p-2" />
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="field">
            <label className="block mb-1 font-medium">PAN</label>
            <input {...register("pan")} placeholder="ABCDE1234F" className="w-full border rounded p-2" />
            {errors.pan && <p className="text-red-600 text-sm">{errors.pan.message}</p>}
          </div>

          <div className="field">
            <label className="block mb-1 font-medium">Aadhaar</label>
            <input {...register("aadhaar")} placeholder="12-digit number" className="w-full border rounded p-2" />
            {errors.aadhaar && (
              <p className="text-red-600 text-sm">{errors.aadhaar.message}</p>
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
