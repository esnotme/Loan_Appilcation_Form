import { useFormStore } from "../store/formStore";
import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function SignatureStep({ onNext, onBack }: Props) {
  const { setSignatureInfo } = useFormStore();
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [agree, setAgree] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setHasSignature(false);
  };

  const handleSubmit = () => {
    const dataUrl = sigCanvas.current?.isEmpty()
      ? ""
      : sigCanvas.current?.toDataURL("image/png");
    setSignatureInfo({ signature: dataUrl || "", agree });
    onNext();
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] step signature-step">
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
            <label className="block mb-2">Draw your signature</label>
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: 500,
                height: 200,
                className: "border rounded bg-white",
              }}
              onEnd={() => setHasSignature(true)}
            />
            <button
              type="button"
              onClick={clearSignature}
              className="mt-2 text-sm text-red-500"
            >
              Clear
            </button>
          </div>

          <div className="flex items-center gap-2">
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
            disabled={!hasSignature || !agree}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
