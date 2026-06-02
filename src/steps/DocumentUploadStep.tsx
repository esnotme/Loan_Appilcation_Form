import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "../store/formStore";
import { documentSchema } from "../schemas/documentSchemas";
import type { DocumentForm } from "../schemas/documentSchemas";

export default function DocumentUploadStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { employmentInfo, setDocumentInfo } = useFormStore();
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

      {employmentInfo?.employmentType === "Salaried" && (
        <div>
          <label className="block">Salary Slips</label>
          <input type="file" {...register("salarySlips")} />
          {errors.salarySlips && <p className="text-red-500">{errors.salarySlips.message}</p>}
        </div>
      )}

      {employmentInfo?.employmentType === "Self-Employed" && (
        <div>
          <label className="block">ITR Documents (Last 3 Years)</label>
          <input type="file" {...register("itrDocs")} multiple />
          {errors.itrDocs && <p className="text-red-500">{errors.itrDocs.message}</p>}
        </div>
      )}

      {employmentInfo?.employmentType === "Other" && (
        <div>
          <label className="block">Supporting Documents</label>
          <input type="file" {...register("otherDocs")} />
          {errors.otherDocs && <p className="text-red-500">{errors.otherDocs.message}</p>}
        </div>
      )}

      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </form>
  );
}
