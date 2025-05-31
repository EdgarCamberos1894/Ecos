import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { CloseArrow } from "./Icons";

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
    <div className="fixed inset-0 z-20 grid bg-black/50 p-2 sm:p-4 md:p-8" onClick={onClose}>
      <div
        className={`flex flex-col place-self-center bg-white shadow-lg ${className}`}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="bg-ecos-blue flex h-fit w-full items-center">
          <h1 className="flex w-full flex-wrap items-center justify-center overflow-hidden px-4 py-4 text-center text-2xl text-white md:h-14">
            {firstNormalText}&nbsp;<span className="font-bold">{highlightedText}</span>&nbsp;
            {secondNormalText}
          </h1>
          <button
            type="button"
            title="CloseArrow"
            onClick={onClose}
            className="p-2 hover:cursor-pointer"
          >
            <CloseArrow fill="white" />
          </button>
        </div>

        {children}
      </div>
    </div>,
    portalRoot,
  );
};

export default Modal;
