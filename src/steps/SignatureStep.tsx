import { useRef, useState } from "react";
import { useFormStore } from "../store/formStore";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function SignatureStep({ onNext, onBack }: Props) {
  const { setSignatureInfo } = useFormStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmit = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const dataUrl = canvas.toDataURL("image/png");

  setSignatureInfo({
    agree: true,            // ✅ mark agreement
    signature: dataUrl,     // ✅ store signature image as string
  });
  onNext();
};


  return (
    <div className="space-y-6 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold text-[var(--color-primary)]">
        Signature
      </h2>

      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="border rounded bg-gray-50 cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      <div className="flex gap-2">
        <button type="button" onClick={clearCanvas} className="secondary">
          Clear
        </button>
        <button type="button" onClick={onBack} className="secondary">
          Back
        </button>
        <button type="button" onClick={handleSubmit} className="primary">
          Next
        </button>
      </div>
    </div>
  );
}
