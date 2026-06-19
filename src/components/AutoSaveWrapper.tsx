import { useEffect, useState } from "react";
import { useFormStore } from "../store/formStore";

export default function AutoSaveWrapper({ children }: { children: React.ReactNode }) {
  const formData = useFormStore((state) => state);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    setStatus("saving");

    const timeout = setTimeout(() => {
      localStorage.setItem("loanFormData", JSON.stringify(formData));
      setStatus("saved");

      setTimeout(() => setStatus("idle"), 1500);
    }, 500);

    return () => clearTimeout(timeout);
  }, [formData]);

  return (
    <div className="relative">
      {children}

      {status !== "idle" && (
        <div className="absolute bottom-2 right-4 text-xs text-gray-500">
          {status === "saving" && "Saving..."}
          {status === "saved" && "✓ Saved"}
        </div>
      )}
    </div>
  );
}