import { useEffect, useRef, useState } from "react";
import { DropdownMenuOption } from "./DropdownMenu";

type DropdownMenuListProps = {
  selected: DropdownMenuOption | undefined;
  onSelect: (option: DropdownMenuOption) => void;
  options: DropdownMenuOption[];
};

export default function DropdownMenuList({
  selected,
  onSelect,
  options,
}: DropdownMenuListProps): React.ReactElement {
  const listRef = useRef<HTMLUListElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    selected ? options.findIndex((option) => option === selected) : -1
  );

  useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const itemHeight = 40; // Hauteur approximative d'un <li>, ajustez si nécessaire
      const scrollPosition = selectedIndex * itemHeight;
      listRef.current.scroll({
        top: scrollPosition,
        behavior: "smooth", // Défilement fluide
      });
    }
  }, [selectedIndex]);

  return (
    <ul
      ref={listRef}
      role="listbox"
      className="max-h-[500px] overflow-y-scroll w-full list-none">
      {options.map((option, index) => (
        <li
          role="option"
          key={index}
          onClick={() => {
            setSelectedIndex(index);
            onSelect(option);
          }}
          className={`p-2 cursor-pointer ${
            selected?.value === option.value ? "bg-blue-500 text-white" : ""
          } hover:bg-gray-200 hover:text-black`}>
          {option.label}
        </li>
      ))}
    </ul>
  );
}
