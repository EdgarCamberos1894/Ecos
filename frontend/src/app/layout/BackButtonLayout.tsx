import { Outlet } from "react-router";
import { BackButtonHeader } from "./Header/BackButtonHeader";

export const BackButtonLayout = () => {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr]">
      <BackButtonHeader />
      <Outlet />
    </div>
  );
};
