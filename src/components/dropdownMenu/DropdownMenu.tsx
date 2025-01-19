import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import DropdownMenuList from "./DropdownMenuList";

type DropdownMenuProps = {
  selected: DropdownMenuOption["value"] | null;
  onSelect: (option: DropdownMenuOption["value"]) => void;
  options: DropdownMenuOption[];
};

export type DropdownMenuOption = { value: string; label?: string };

export default function DropdownMenu({
  selected,
  onSelect,
  options,
}: DropdownMenuProps): React.ReactElement {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const [selectedOption, setSelectedOption] = useState<
    DropdownMenuOption | undefined
  >(options.find(({ value }) => value === selected));

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /** Open Dropdown adjusting position */
  function handleOpenDropdown() {
    if (isDropdownOpen) return;

    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < 500 && spaceAbove > 500) {
        setPosition("top");
      } else {
        setPosition("bottom");
      }
    }
    setIsDropdownOpen(true);
  }

  function handleOptionNavigation(orientation: "previous" | "next") {
    if (!isDropdownOpen) {
      handleOpenDropdown();
      return;
    }
    const currentIndex = selectedOption
      ? options.findIndex((option) => option === selectedOption)
      : 0;

    const newIndex =
      orientation === "previous"
        ? (currentIndex - 1 + options.length) % options.length
        : (currentIndex + 1) % options.length;

    setSelectedOption(options[newIndex]);
  }

  function handleChange(option: DropdownMenuOption) {
    setSelectedOption(option);
    onSelect(option.value);
    handleClose();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case "ArrowUp":
        handleOptionNavigation("previous");
        event.preventDefault();
        break;

      case "ArrowDown":
        handleOptionNavigation("next");
        event.preventDefault();
        break;

      case "Escape":
        inputRef.current?.blur();
        break;

      case "Enter": {
        event.preventDefault();
        setTimeout(() => {
          handleClose();
        }, 0);
        break;
      }

      case "Tab":
        inputRef.current?.blur();
        break;

      default:
        event.preventDefault();
        break;
    }
  }

  /** Handle blur with modal closing */
  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    const relatedTarget = event.relatedTarget as Node;
    if (
      relatedTarget &&
      (inputRef.current?.contains(relatedTarget) ||
        dropdownRef.current?.contains(relatedTarget))
    ) {
      return;
    }
    const isSame = selectedOption && selected === selectedOption.value;
    if (!isSame) {
      setSelectedOption(options.find(({ value }) => value === selected));
    }
    handleClose();
  }

  function handleClose() {
    setIsDropdownOpen(false);
  }

  return (
    <div onBlur={handleBlur} className="relative flex flex-1 cursor-pointer">
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        type="text"
        value={
          selectedOption?.label || selectedOption?.value || "Select your option"
        }
        onClick={() => {
          if (isDropdownOpen) handleClose();
          else handleOpenDropdown();
        }}
        className="border rounded-md border-gray-300 p-2 flex-1 cursor-pointer"
        readOnly
      />
      <InputIcon isOpen={isDropdownOpen} />
      <div
        data-testid="dropdown"
        onMouseDown={(e) => e.preventDefault()}
        ref={dropdownRef}
        className={`absolute w-full z-30 bg-white border border-gray-300 rounded-md shadow-lg transition-transform duration-300 ease-in-out ${
          position === "top"
            ? "origin-bottom scale-y-0 opacity-0 bottom-full"
            : "origin-top scale-y-0 opacity-0 top-full"
        } ${
          isDropdownOpen
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none"
        }`}>
        <DropdownMenuList
          selected={selectedOption}
          onSelect={handleChange}
          options={options}
        />
      </div>
    </div>
  );
}

const InputIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="absolute w-full h-full flex items-center justify-end pr-2 pointer-events-none">
    <div
      className={`transition-transform duration-300 ${
        isOpen ? "rotate-180" : "rotate-0"
      }`}>
      <ChevronDown />
    </div>
  </div>
);
