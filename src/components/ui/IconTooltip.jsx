import { useState } from "react";

export default function IconTooltip({ onClick, icon, children }) {
  const Icon = icon;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="group relative inline-flex cursor-pointer items-center justify-center h-8 w-8"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() =>
        setTimeout(() => {
          setIsOpen(false);
        }, 100)
      }
    >
      <Icon
        onClick={onClick}
        className="h-6 w-6 text-white justify-center items-center transition-opacity duration-200"
      />
      {isOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 rounded-md bg-zinc-950/20  px-3 py-2 text-sm text-white">
          {children}
        </div>
      )}
    </div>
  );
}
