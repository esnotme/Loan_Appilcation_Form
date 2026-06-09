import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignatureCanvas from "react-signature-canvas";
import { signatureSchema } from "../schemas/signatureSchemas";
import type { SignatureForm } from "../schemas/signatureSchemas";
import { useFormStore } from "../store/formStore";

export default function SignatureStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { setSignatureInfo } = useFormStore();
  const sigCanvas = useRef<SignatureCanvas>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SignatureForm>({
    resolver: zodResolver(signatureSchema),
  });

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const onSubmit = (data: SignatureForm) => {
    const signatureImage = sigCanvas.current?.toDataURL();
    setSignatureInfo({ ...data, signature: signatureImage || "" });
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
        <label className="block">Draw Your Signature</label>
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{ className: "border w-full h-32" }}
        />
        <button type="button" onClick={clearSignature} className="bg-gray-500 text-white px-2 py-1 rounded mt-2">
          Clear
        </button>
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </form>
  );
}
