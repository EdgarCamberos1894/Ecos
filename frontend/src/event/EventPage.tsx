import { useState } from "react";
import { ProgressBar } from "./components/ProgressBar";
import StepOne from "./components/step/StepOne";
import StepTwo from "./components/step/StepTwo";
import StepThree from "./components/step/StepThree";
import StepFour from "./components/step/StepFour";
import { FormData } from "./type/FormData";

const steps = ["Editar", "Banner", "Entradas", "Revisar"];

const initialData: FormData = {
  name: "",
  category: "",
  dateString: "",
  startTime: "",
  endTime: "",
  type: "Single",
  location: "",
  description: "",
  image: null,
  tickets: [],
};

export default function EventPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialData);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  return (
    <section className="flex w-full flex-col items-center justify-center px-3 lg:mt-[135px] lg:mb-[232px] lg:max-w-[1881px] lg:gap-y-5 lg:px-[150px]">
      <header className="flex w-full flex-col font-[Roboto] text-[#19233A]">
        <h2 className="text-start text-[32px] font-medium">Crear nuevo evento</h2>
      </header>
      <ProgressBar currentStep={currentStep} steps={steps} />

      {currentStep === 0 && (
        <StepOne nextStep={nextStep} formData={formData} setFormData={setFormData} />
      )}
      {currentStep === 1 && (
        <StepTwo
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 2 && (
        <StepThree
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 3 && <StepFour prevStep={prevStep} formData={formData} />}
    </section>
  );
}
