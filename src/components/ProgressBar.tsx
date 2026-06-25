interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <progress
      className="w-full h-3 rounded bg-gray-200 appearance-none"
      value={currentStep}
      max={totalSteps}
    />
  );
}
