import { X } from "lucide-react";
import { useEffect } from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  title?: string;
};

export default function Modal({ children, isOpen, close, title }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Global scroll off
    } else {
      document.body.style.overflow = ""; // Global scroll on
    }

    // Global scroll on
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      onClick={close}
      className={`fixed justify-center items-center top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-md ${
        isOpen ? "flex" : "hidden"
      }`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white flex flex-col min-w-96 min-h-72 max-w-full rounded-lg p-6 gap-6 ${
          isOpen ? "animate-fadeInScale" : "animate-fadeOutScale"
        }`}>
        {/* Header */}
        <div className="flex flex-row-reverse items-center justify-between">
          <X className="cursor-pointer" onClick={close} />
          <p className={`${title ? "block" : "hidden"} font-bold text-lg`}>
            {title}
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">{children}</div>
      </div>
    </div>
  );
}
