import { useFormStore } from "../store/formStore";
import { useState } from "react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function SignatureStep({ onNext, onBack }: Props) {
  const { setSignatureInfo } = useFormStore();
  const [signature, setSignature] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = () => {
    setSignatureInfo({ signature, agree });
    onNext();
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] srep signature-step">
      {/* Header bar */}
      <header className="bg-[var(--color-primary)] py-4 px-6">
        <h1 className="text-white text-2xl font-bold">Application Form</h1>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-xl font-bold text-[var(--color-primary)]">
          Signature & Agreement
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="signature">Signature</label>
            <input
              id="signature"
              type="text"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Type your full name"
              title="Signature"
            />
          </div>

          <div className="field checkbox-field flex items-center gap-2">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              title="Agree to terms"
            />
            <label htmlFor="agree">I agree to the terms and conditions</label>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onBack} className="secondary">
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="primary"
            disabled={!signature || !agree}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
