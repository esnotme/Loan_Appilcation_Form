import { useFormStore } from "../store/formStore";
import { useState } from "react";

interface Props {
  onNext: () => void;
}

export default function LoanTypeStep({ onNext }: Props) {
  const { setLoanType } = useFormStore();
  const [selected, setSelected] = useState<"Personal" | "Home" | "Self-Employed">("Personal");

  const handleNext = () => {
    setLoanType(selected);
    onNext();
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold text-[var(--color-primary)]">
        Select Loan Type
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Personal Loan */}
        <label
          className={`border rounded p-4 flex flex-col items-center cursor-pointer ${
            selected === "Personal" ? "border-[var(--color-primary)] bg-gray-50" : ""
          }`}
        >
          <input
            type="radio"
            name="loanType"
            value="Personal"
            checked={selected === "Personal"}
            onChange={() => setSelected("Personal")}
            className="hidden"
          />
          <span className="text-3xl">👤</span>
          <span className="mt-2 font-semibold">Personal Loan</span>
        </label>

        {/* Home Loan */}
        <label
          className={`border rounded p-4 flex flex-col items-center cursor-pointer ${
            selected === "Home" ? "border-[var(--color-primary)] bg-gray-50" : ""
          }`}
        >
          <input
            type="radio"
            name="loanType"
            value="Home"
            checked={selected === "Home"}
            onChange={() => setSelected("Home")}
            className="hidden"
          />
          <span className="text-3xl">🏠</span>
          <span className="mt-2 font-semibold">Home Loan</span>
        </label>

        {/* Self-Employed Loan */}
        <label
          className={`border rounded p-4 flex flex-col items-center cursor-pointer ${
            selected === "Self-Employed" ? "border-[var(--color-primary)] bg-gray-50" : ""
          }`}
        >
          <input
            type="radio"
            name="loanType"
            value="Self-Employed"
            checked={selected === "Self-Employed"}
            onChange={() => setSelected("Self-Employed")}
            className="hidden"
          />
          <span className="text-3xl">💼</span>
          <span className="mt-2 font-semibold">Self‑Employed Loan</span>
        </label>
      </div>

      <div className="flex justify-end">
        <button type="button" onClick={handleNext} className="primary">
          Next
        </button>
      </div>
    </div>
  );
}
