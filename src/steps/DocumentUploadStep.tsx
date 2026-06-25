import { useState } from "react";
import { useFormStore } from "../store/formStore";
import { useDropzone } from "react-dropzone";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function DocumentUploadStep({ onNext, onBack }: Props) {
  const { setDocumentInfo } = useFormStore();
  const [idFiles, setIdFiles] = useState<File[]>([]);
  const [incomeFiles, setIncomeFiles] = useState<File[]>([]);
  const [addressFiles, setAddressFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const validateAndCompress = async (file: File): Promise<File | null> => {
    if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
      setErrors((prev) => [...prev, `${file.name}: Only JPG, PNG, or PDF allowed`]);
      return null;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => [...prev, `${file.name}: File size must be under 5MB`]);
      return null;
    }
    if (file.type.startsWith("image/")) {
      return await compressImage(file);
    }
    return file;
  };

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const scale = 0.7;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: file.type }));
          }
        }, file.type, 0.8);
      };
      reader.readAsDataURL(file);
    });
  };

  const makeDropzone = (files: File[], setFiles: React.Dispatch<React.SetStateAction<File[]>>, label: string) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: async (acceptedFiles) => {
        const processed: File[] = [];
        for (const f of acceptedFiles) {
          const valid = await validateAndCompress(f);
          if (valid) processed.push(valid);
        }
        setFiles((prev) => [...prev, ...processed].slice(0, 3));
      },
    });

    return (
      <section className="space-y-3">
        <h3 className="font-semibold">{label}</h3>
        <div
          {...getRootProps()}
          className="dropzone border-2 border-dashed border-gray-400 p-4 rounded cursor-pointer hover:bg-gray-50"
          aria-label={`${label} upload area`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">Drag & drop files here, or click to select</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {files.map((file, i) => (
            <div key={i} className="border p-2 rounded text-center relative">
              {file.type === "application/pdf" ? (
                <span className="text-sm text-gray-700">📄 {file.name}</span>
              ) : (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-24 w-full object-cover rounded"
                />
              )}
              <button
                type="button"
                onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                className="absolute top-1 right-1 text-xs text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const handleSubmit = () => {
    setDocumentInfo({
      idProof: idFiles[0]?.name || "",
      incomeProof: incomeFiles[0]?.name || "",
      addressProof: addressFiles[0]?.name || "",
    });
    onNext();
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] step document-step">
      <header className="bg-[var(--color-primary)] py-4 px-6">
        <h1 className="text-white text-2xl font-bold">Application Form</h1>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-xl font-bold text-[var(--color-primary)]">Document Upload</h2>

        {makeDropzone(idFiles, setIdFiles, "ID Proof")}
        {makeDropzone(incomeFiles, setIncomeFiles, "Income Proof")}
        {makeDropzone(addressFiles, setAddressFiles, "Address Proof")}

        {errors.length > 0 && (
          <ul className="error-text list-disc pl-5">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}

        <div className="flex gap-2">
          <button type="button" onClick={onBack} className="secondary">Back</button>
          <button type="button" onClick={handleSubmit} className="primary">Next</button>
        </div>
      </main>
    </div>
  );
}
