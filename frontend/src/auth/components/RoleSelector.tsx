import image from "@/assets/image.webp";
import Button from "@/shared/Button";
import { useState } from "react";
import RegistrationForm from "./RegistrationForm";

const RoleSelector = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleRoleSelection = () => {
    setShowRegistrationForm(true);
  };

  return (
    <div className="flex h-full flex-col items-center justify-around">
      {!showRegistrationForm ? (
        <>
          <div className="flex w-full items-center justify-around gap-10">
            <img src={image} alt="image" className="h-[120px] rounded-[16px]" />
            <div className="flex flex-col items-start justify-between gap-4">
              <Button
                type="button"
                className="bg-transparent font-bold"
                onClick={handleRoleSelection}
              >
                Registrate como Fan
              </Button>
              <p className="text-[#49454F]">
                Description duis aute irure dolor in reprehenderit in voluptate velit. <br />
                Description duis aute irure dolor in reprehenderit in voluptate velit.
              </p>
            </div>
          </div>

          <div className="flex w-full items-center justify-around gap-10">
            <img src={image} alt="image" className="h-[120px] rounded-[16px]" />
            <div className="flex flex-col items-start justify-between gap-4">
              <Button
                type="button"
                className="bg-transparent font-bold"
                onClick={handleRoleSelection}
              >
                Registrate como Músico
              </Button>
              <p className="text-[#49454F]">
                Description duis aute irure dolor in reprehenderit in voluptate velit. <br />
                Description duis aute irure dolor in reprehenderit in voluptate velit.
              </p>
            </div>
          </div>
        </>
      ) : (
        <RegistrationForm />
      )}
    </div>
  );
};

export default RoleSelector;
