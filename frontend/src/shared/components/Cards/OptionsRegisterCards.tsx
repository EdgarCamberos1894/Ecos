import React from "react";

interface OptionsRegisterCardsProps {
  id: string;
  icono: string;
  option: string;
  description: string;
  imageSrc: string;
  title: string;
  parrafo2: string;
  parrafo: string;
  buttonText: string;
}

const OptionsRegisterCards: React.FC<OptionsRegisterCardsProps> = ({
  icono,
  option,
  description,
  imageSrc,
  title,
  parrafo2,
  parrafo,
  buttonText,
}) => {
  return (
    <div className="mx-auto mb-24 flex h-auto w-96 flex-col rounded-xl border bg-[#19233A] text-center sm:w-108">
      <div className="flex h-20 gap-4">
        <img
          src={icono}
          alt={option}
          className="ms-2 mt-4 flex h-10 w-10 items-center justify-center"
        />
        <div className="mt-2 text-start">
          <h2 className="text-md text-start font-bold text-white">{option}</h2>
          <p className="text-white">{description}</p>
        </div>
      </div>
      <div className="text-start">
        <img src={imageSrc} alt={title} className="mt-1 h-[188px] w-[520px] object-cover" />
        <h1 className="mx-4 text-lg font-semibold text-white">{title}</h1>
        <p className="mx-4 mt-2 mb-4 text-sm text-white">{parrafo}</p>
        <p className="mx-4 mt-2 mb-4 text-sm text-white">{parrafo2}</p>
      </div>
      <div className="mx-4 flex justify-end">
        <button type="submit" className="mb-4 w-32 rounded-3xl bg-[#FE963D] px-4 py-2 text-white">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default OptionsRegisterCards;
