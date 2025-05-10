import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { CloseArrow } from "@/auth/components/ui/CloseArrow";

interface ModalProps extends PropsWithChildren {
  onClose: () => void;
  firstNormalText?: string;
  highlightedText?: string;
  secondNormalText?: string;
  className?: string;
}

const portalRoot = document.getElementById("portal-root");

const Modal = ({
  onClose,
  children,
  firstNormalText,
  highlightedText,
  secondNormalText,
  className = "",
}: ModalProps) => {
  if (!portalRoot) return;

  return createPortal(
    <div className="fixed inset-0 grid bg-black/50" onClick={onClose}>
      <div
        className={`relative flex flex-col place-self-center rounded-[30px] bg-white shadow-lg ${className}`}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="h-fit w-full">
          <h1 className="flex w-full items-center justify-center rounded-t-[30px] bg-[#D9D9D9] text-2xl md:h-14">
            {firstNormalText} &nbsp; <span className="font-bold">{highlightedText}</span> &nbsp;
            {secondNormalText}
          </h1>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 hover:cursor-pointer"
          >
            <CloseArrow />
          </button>
        </div>

        {children}
      </div>
    </div>,
    portalRoot,
  );
};

export default Modal;
