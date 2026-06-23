import "styles/modal.css";
import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>
        {title && <div className="modal__header">{title}</div>}
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
