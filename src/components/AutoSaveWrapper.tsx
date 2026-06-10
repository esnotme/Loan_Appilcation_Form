import { useEffect, useState } from "react";
import { useFormStore } from "../store/formStore";

interface Props {
  children: React.ReactNode;
}

export default function AutoSaveWrapper({ children }: Props) {
  const formData = useFormStore(); // ✅ grab all form data
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    if (!formData) return;

    setStatus("saving");

    const timeout = setTimeout(() => {
      // ✅ simulate persistence (replace with API call if needed)
      localStorage.setItem("loanFormData", JSON.stringify(formData));
      setStatus("saved");

      // reset back to idle after 2s
      setTimeout(() => setStatus("idle"), 2000);
    }, 500);

    return () => clearTimeout(timeout);
  }, [formData]);

  return (
    <div className="relative">
      {children}

      {/* ✅ Status indicator */}
      {status !== "idle" && (
        <div className="absolute bottom-2 right-4 text-xs text-gray-500">
          {status === "saving" && "Saving..."}
          {status === "saved" && "✓ Saved"}
        </div>
      )}
    </div>
  );
}
