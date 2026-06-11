import { useState } from "react";
import { useFormStore } from "../store/formStore";
import { useDropzone } from "react-dropzone";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function DocumentUploadStep({ onNext, onBack }: Props) {
  const { setDocumentInfo } = useFormStore();
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const onDrop = async (acceptedFiles: File[]) => {
    const validFiles: File[] = [];
    const newErrors: string[] = [];

    for (const file of acceptedFiles) {
      if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
        newErrors.push(`${file.name}: Only JPG, PNG, or PDF allowed`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        newErrors.push(`${file.name}: File size must be under 5MB`);
        continue;
      }

      if (file.type.startsWith("image/")) {
        const compressed = await compressImage(file);
        validFiles.push(compressed);
      } else {
        validFiles.push(file);
      }
    }

    setFiles((prev) => [...prev, ...validFiles].slice(0, 3)); // max 3 files
    setErrors(newErrors);
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

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setDocumentInfo({
      idProof: files[0]?.name || "",
      incomeProof: files[1]?.name || "",
      addressProof: files[2]?.name || "",
    });
    onNext();
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header bar */}
      <header className="bg-[var(--color-primary)] py-4 px-6">
        <h1 className="text-white text-2xl font-bold">Application Form</h1>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-xl font-bold text-[var(--color-primary)]">
          Document Upload
        </h2>

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-400 p-6 rounded cursor-pointer hover:bg-gray-50"
          aria-label="File upload area"
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            Drag & drop files here, or click to select
          </p>
        </div>

        {errors.length > 0 && (
          <ul className="error-text list-disc pl-5">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}

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
                onClick={() => removeFile(i)}
                className="absolute top-1 right-1 text-xs text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button type="button" onClick={onBack} className="secondary">
            Back
          </button>
          <button type="button" onClick={handleSubmit} className="primary">
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
