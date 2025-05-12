interface ProgressBarProps {
  currentStep: number;
  steps: string[];
}

export function ProgressBar({ currentStep, steps }: ProgressBarProps) {
  const percentage = currentStep === 0 ? 23 : (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="relative mb-6 w-full max-w-7xl px-6">
      <div className="absolute top-3 right-0 left-0 z-0 h-1 bg-gray-300" />

      <div
        className="absolute top-3 left-0 z-10 h-1 bg-orange-500 transition-all duration-300"
        style={{ width: String(percentage) + "%" }}
      />

      <div className="relative z-20 flex items-center justify-around">
        {steps.map((label, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={label} className="flex flex-col items-center text-center">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border-5 ${
                  isCompleted || isCurrent
                    ? "border-orange-500 bg-black"
                    : "border-gray-300 bg-white"
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    isCompleted || isCurrent ? "bg-black" : "bg-white"
                  }`}
                />
              </div>
              <span
                className={`mt-2 text-xs font-semibold ${
                  isCompleted || isCurrent ? "text-black" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
