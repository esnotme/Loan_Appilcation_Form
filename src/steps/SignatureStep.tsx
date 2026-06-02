import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signatureSchema } from "../schemas/signatureSchemas";
import type { SignatureForm } from "../schemas/signatureSchemas";
import { useFormStore } from "../store/formStore";

export default function SignatureStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { setSignatureInfo } = useFormStore();
  const { register, handleSubmit, formState: { errors } } = useForm<SignatureForm>({
    resolver: zodResolver(signatureSchema),
  });

  const onSubmit = (data: SignatureForm) => {
    setSignatureInfo(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Signature</h2>

      <div>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("agree")} />
          I confirm that the information provided is accurate
        </label>
        {errors.agree && <p className="text-red-500">{errors.agree.message}</p>}
      </div>

      <div>
        <label className="block">Signature (type your full name)</label>
        <input {...register("signature")} className="border p-2 w-full" />
        {errors.signature && <p className="text-red-500">{errors.signature.message}</p>}
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </form>
  );
}
