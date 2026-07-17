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
    <div
      className="fixed inset-0 z-20 grid bg-slate-950/60 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        className={`flex flex-col place-self-center overflow-hidden rounded-lg bg-white shadow-2xl ${className}`}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="bg-ecos-blue flex h-fit w-full items-center">
          <h1 className="flex w-full flex-wrap items-center justify-center overflow-hidden px-4 py-4 text-center text-xl text-white md:h-16 md:text-2xl">
            {firstNormalText}&nbsp;<span className="font-bold">{highlightedText}</span>&nbsp;
            {secondNormalText}
          </h1>
          <button
            type="button"
            title="Cerrar"
            aria-label="Cerrar"
            onClick={onClose}
            className="rounded-md p-3 transition-colors hover:cursor-pointer hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
