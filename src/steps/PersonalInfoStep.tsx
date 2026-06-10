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
      personalInfoSchema.merge(verificationSchema) // ✅ combine schemas
    ),
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    setPersonalInfo({
      fullName: data.fullName,
      dob: data.dob, // ✅ include dob
      email: data.email,
      phone: data.phone,
    });
    setVerificationInfo({
      pan: data.pan,
      aadhaar: data.aadhaar,
      panVerified: false, // ✅ required fields
      aadhaarVerified: false,
    });
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold text-[var(--color-primary)]">
        Personal Information
      </h2>

      <div>
        <label>Full Name</label>
        <input {...register("fullName")} />
        {errors.fullName && <p className="error-text">{errors.fullName.message}</p>}
      </div>

      <div>
        <label>Date of Birth</label>
        <input type="date" {...register("dob")} />
        {errors.dob && <p className="error-text">{errors.dob.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
      </div>

      <div>
        <label>Phone</label>
        <input type="tel" {...register("phone")} />
        {errors.phone && <p className="error-text">{errors.phone.message}</p>}
      </div>

      <div>
        <label>PAN</label>
        <input {...register("pan")} placeholder="ABCDE1234F" />
        {errors.pan && <p className="error-text">{errors.pan.message}</p>}
      </div>

      <div>
        <label>Aadhaar</label>
        <input {...register("aadhaar")} placeholder="12-digit number" />
        {errors.aadhaar && <p className="error-text">{errors.aadhaar.message}</p>}
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
