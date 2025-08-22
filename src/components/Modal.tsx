"use client";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="
          relative w-full max-w-md 
          rounded-2xl 
          bg-[var(--bunker)] 
          border border-[var(--paradiso)] 
          shadow-xl 
          p-6
          text-[var(--foreground)]
        "
      >
        {/* Tombol close */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3 
            text-[var(--keppel)] 
            hover:text-[var(--lochinvar)] 
            transition 
            text-2xl 
            font-bold
          "
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
