import { ReactNode } from "react";
import closeIcon from "@/assets/x-circle-contained.svg";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  normalText: string;
  highlightedText: string;
}

const Popup = ({ isOpen, onClose, children, normalText, highlightedText }: PopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-around pt-10">
      <div className="relative flex h-full max-h-[501px] w-full max-w-[700px] flex-col rounded-[30px] bg-white shadow-lg">
        <h1 className="flex h-14 w-full items-center justify-center rounded-t-[30px] bg-[#D9D9D9] text-2xl">
          {normalText} <span className="font-bold"> {highlightedText} </span>
        </h1>
        <button type="button" onClick={onClose} className="absolute top-2 right-2">
          <img src={closeIcon} alt="close modal" />
        </button>
        <div className="flex flex-1 items-center justify-center">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
