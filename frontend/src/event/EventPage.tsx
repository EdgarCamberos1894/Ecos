import { useState } from "react";
import { ProgressBar } from "./components/ProgressBar";
import StepOne from "./components/step/StepOne";
import StepTwo from "./components/step/StepTwo";
import StepThree from "./components/step/StepThree";
import StepFour from "./components/step/StepFour";
import { FormData } from "./type/FormData";

const steps = ["Editar", "Banner", "Entradas", "Revisar"];

const initialData: FormData = {
  eventName: "",
  category: "",
  date: "",
  hour: "",
  location: "",
  description: "",
  image: null,
  price: 0,
};

export default function ProgresCreateEvent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialData);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  return (
    <section className="ms-52 mt-24 max-w-[1881px]">
      <h2 className="m-10 font-[roboto] text-[32px] font-semibold">Crear nuevo evento</h2>
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
