import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { documentSchema } from "../schemas/documentSchemas";
import type { DocumentForm } from "../schemas/documentSchemas";
import { useFormStore } from "../store/formStore";

export default function DocumentUploadStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { setDocumentInfo } = useFormStore();
  const { register, handleSubmit, formState: { errors } } = useForm<DocumentForm>({
    resolver: zodResolver(documentSchema),
  });

  const onSubmit = (data: DocumentForm) => {
    setDocumentInfo(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Document Upload</h2>

      <div>
        <label className="block">ID Proof</label>
        <input type="file" {...register("idProof")} className="border p-2 w-full" />
        {errors.idProof && <p className="text-red-500">{errors.idProof.message}</p>}
      </div>

      <div>
        <label className="block">Income Proof</label>
        <input type="file" {...register("incomeProof")} className="border p-2 w-full" />
        {errors.incomeProof && <p className="text-red-500">{errors.incomeProof.message}</p>}
      </div>

      <div>
        <label className="block">Address Proof</label>
        <input type="file" {...register("addressProof")} className="border p-2 w-full" />
        {errors.addressProof && <p className="text-red-500">{errors.addressProof.message}</p>}
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </form>
  );
}
