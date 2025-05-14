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
  date: "",
  hour: "",
  location: "",
  description: "",
  image: null,
  price: {
    puerta: 0,
    locuras: 0,
  },
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
    <section className="mt-24 mb-24 flex w-full flex-col items-center justify-center px-3 lg:max-w-[1881px]">
      <header className="mb-6 flex w-full max-w-7xl flex-col gap-2 px-6 font-[Roboto] text-[#19233A]">
        <h2 className="text-start text-[32px] font-medium">Crear nuevo evento</h2>
        <p className="text-start text-2xl font-medium">Lugar</p>
        <p className="text-start text-2xl font-medium">Horario</p>
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
