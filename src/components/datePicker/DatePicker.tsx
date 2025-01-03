import { format } from "date-fns";
import { useRef, useState } from "react";

import DatePickerCalendar from "./DatePickerCalendar";
import { handleDate } from "../../utils/datePicker";

type DatePickerProps = {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
};

export default function DatePicker({
  selectedDate,
  onDateChange,
}: DatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""
  );
  const [position, setPosition] = useState<"top" | "bottom">("bottom");

  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  function handleToggleCalendar() {
    setIsCalendarOpen((prev) => !prev);

    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < 300 && spaceAbove > 300) {
        setPosition("top");
      } else {
        setPosition("bottom");
      }
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    const relatedTarget = event.relatedTarget as Node;
    if (
      relatedTarget &&
      (inputRef.current?.contains(relatedTarget) ||
        calendarRef.current?.contains(relatedTarget))
    ) {
      return;
    }
    setIsCalendarOpen(false);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^0-9]/g, "");

    const day = sanitizedValue.slice(0, 2).trim();
    const month = sanitizedValue.slice(2, 4).trim();
    const year = sanitizedValue.slice(4, 8).trim();

    // Format automatique
    const formattedValue = `${
      day === "" ? "dd" : handleDate(day, month, year)
    }/${month === "" ? "mm" : month}/${year === "" ? "yyyy" : year}`;

    setInputValue(formattedValue);

    // // Valider la date complète
    // if (formattedValue.length === 10) {
    //   const parsedDate = parse(formattedValue, "dd/MM/yyyy", new Date());
    //   if (isValid(parsedDate)) {
    //     onDateChange(parsedDate);
    //   }
    // }
  };

  function handleCalendarChange(date: Date) {
    setInputValue(format(date, "dd/MM/yyyy"));
    onDateChange(date);
    setIsCalendarOpen(false);
  }

  return (
    <div onBlur={handleBlur} className="relative flex flex-1">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleToggleCalendar}
        className="border rounded-md border-gray-300 p-2 flex-1"
        placeholder="dd/mm/yyyy"
      />

      {isCalendarOpen && (
        <div
          ref={calendarRef}
          className={`absolute z-10 bg-white border rounded-md shadow-lg ${
            position === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}>
          <DatePickerCalendar
            selectedDate={selectedDate}
            onDateChange={handleCalendarChange}
          />
        </div>
      )}
    </div>
  );
}
