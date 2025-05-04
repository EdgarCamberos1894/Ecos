import React from "react";

interface OptionsRegisterCardsProps {
  id: string;
  icono: string;
  option: string;
  description: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  parrafo: string;
  buttonText: string;
}

const OptionsRegisterCards: React.FC<OptionsRegisterCardsProps> = ({
  icono,
  option,
  description,
  imageSrc,
  title,
  subtitle,
  parrafo,
  buttonText,
}) => {
  return (
    <div className="flex h-[480px] w-[520px] flex-col rounded-lg border border-[#B1B1B1] bg-white text-center">
      <div className="mx-4 flex min-h-[78px] w-3/5 gap-4">
        <img src={icono} alt={option} className="mt-4 flex h-10 w-10 items-center justify-center" />
        <div className="mt-2 text-start">
          <h2 className="text-start font-bold text-gray-800">{option}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <div className="text-start">
        <img src={imageSrc} alt={title} className="mt-1 h-[188px] w-[520px] object-cover" />
        <h1 className="mx-4 text-xl font-semibold">{title}</h1>
        <h3 className="mx-4 mt-2 mb-6 text-lg font-semibold">{subtitle}</h3>
        <p className="mx-4 mt-2">{parrafo}</p>
      </div>
      <div className="mx-4 flex justify-end">
        <button type="submit" className="mt-4 w-32 rounded-3xl bg-[#707070] px-4 py-2 text-white">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default OptionsRegisterCards;
