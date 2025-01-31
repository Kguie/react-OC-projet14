import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Noop } from "react-hook-form";

import DropdownMenuList from "./DropdownMenuList";

type DropdownMenuProps = {
  selected: DropdownMenuOption["value"] | null;
  onSelect: (option: DropdownMenuOption["value"]) => void;
  options: DropdownMenuOption[];
  controlOnBlur?: Noop;
  error?: boolean;
  required?: boolean;
};

export type DropdownMenuOption = { value: string; label?: string };

export default function DropdownMenu({
  selected,
  onSelect,
  options,
  controlOnBlur,
  error,
  required,
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
      : -1;

    const newIndex =
      orientation === "previous"
        ? currentIndex === -1
          ? options.length - 1
          : (currentIndex - 1 + options.length) % options.length
        : (currentIndex + 1) % options.length;

    setSelectedOption(options[newIndex]);
  }

  function handleChange(option: DropdownMenuOption) {
    setSelectedOption(option);
    onSelect(option.value);
    handleClose();
    if (controlOnBlur && error) controlOnBlur();
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
        if (!selectedOption?.value) return;
        onSelect(selectedOption.value);
        setTimeout(() => {
          handleClose();
        }, 0);
        break;
      }

      case "Tab":
        inputRef.current?.blur();
        break;

      default:
        if (/^[a-zA-Z]$/.test(event.key)) {
          const foundOption = options.find(({ value }) =>
            value.toLowerCase().startsWith(event.key.toLowerCase())
          );

          if (foundOption) {
            setSelectedOption(foundOption);
          }
        } else {
          event.preventDefault();
        }
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
    <div onBlur={handleBlur} className="relative flex cursor-pointer">
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        type="text"
        onBlur={controlOnBlur}
        required={required}
        value={
          selectedOption?.label || selectedOption?.value || "Select your option"
        }
        title={
          selectedOption?.label || selectedOption?.value || "Select your option"
        }
        onClick={() => {
          if (isDropdownOpen) handleClose();
          else handleOpenDropdown();
        }}
        className={`text-white w-full border rounded-md p-2 cursor-pointer truncate ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        readOnly
      />
      <DisplayInput
        value={
          selectedOption?.label || selectedOption?.value || "Select your option"
        }
        isOpen={isDropdownOpen}
      />
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

const DisplayInput = ({
  value,
  isOpen,
}: {
  value: string;
  isOpen: boolean;
}) => (
  <div className="absolute  w-full h-full flex items-center p-2 justify-between pointer-events-none">
    <div className="flex flex-1 max-w-[80%]">
      <p className="truncate">{value}</p>
    </div>
    <div
      className={`transition-transform duration-300 ${
        isOpen ? "rotate-180" : "rotate-0"
      }`}>
      <ChevronDown />
    </div>
  </div>
);
