interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded h-3 mb-6">
      <div
        className="h-3 rounded bg-[var(--color-primary)] transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
