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
  const HeaderContent = (
    <div className="flex items-center space-x-4 p-2">
      <img src={icono} alt={option} className="h-10 w-10" />
      <div className="text-start">
        <h2 className="font-bold">{option}</h2>
        <p>{description}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-ecos-blue flex h-20 justify-between rounded-xl text-white md:hidden">
        {HeaderContent}
        <img src={imageSrc} alt={title} className="h-20 w-[120px] rounded-r-[10px] object-cover" />
      </div>

      <div className="border-ecos-blue bg-ecos-blue hidden h-auto max-h-[456px] max-w-[520px] flex-col justify-between rounded-xl border py-3 text-white md:flex">
        {HeaderContent}
        <div className="space-y-3.5 text-start">
          <img src={imageSrc} alt={title} className="object-cover" />
          <h1 className="mx-4 text-lg font-semibold">{title}</h1>
          <p className="mx-4 text-sm">{parrafo}</p>
          <p className="mx-4 text-sm">{parrafo2}</p>
        </div>

        <div className="mx-4 mt-auto flex justify-end">
          <button
            type="button"
            className="bg-ecos-orange-light w-32 rounded-3xl px-4 py-2 text-white"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default OptionsRegisterCards;
