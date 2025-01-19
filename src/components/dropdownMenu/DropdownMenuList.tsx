import { useEffect, useRef } from "react";

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
  const liRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (listRef.current?.scroll && liRef.current) {
      listRef.current.scroll({
        top: liRef.current.offsetTop,
        behavior: "instant",
      });
    }
  }, [selected]);

  return (
    <ul
      ref={listRef}
      role="listbox"
      className="max-h-[500px] overflow-y-scroll w-full list-none">
      {options.map((option, index) => (
        <li
          role="option"
          ref={option === selected ? liRef : undefined}
          key={index}
          onClick={() => {
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
