import { format, parse } from "date-fns";
import { useRef, useState } from "react";

import DatePickerCalendar from "./DatePickerCalendar";
import {
  handleCalendarDate,
  handleCalendarMonth,
} from "../../utils/datePicker";

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
    const originalDate = selectedDate ? format(selectedDate, "dd/MM/yyyy") : "";
    if (originalDate !== inputValue) {
      setInputValue(originalDate);
    }
    setIsCalendarOpen(false);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^0-9/]/g, "");
    const [day, month, year] = sanitizedValue.split("/");

    const formattedValue = [
      handleCalendarDate(day, month, year),
      handleCalendarMonth(month),
      year,
    ].join("/");

    setInputValue(formattedValue);
  }

  function handleFixFormat() {
    const value = inputValue;
    const sanitizedValue = value.replace(/[^0-9/_]/g, "");
    const [day, month, year] = sanitizedValue.split("/");
    const [currentDay, currentMonth, currentYear] = format(
      new Date(),
      "dd/MM/yyyy"
    ).split("/");

    const formattedValue = [
      day.length === 0 ? currentDay : day.padStart(2, "0"),
      month.length === 0 ? currentMonth : month.padStart(2, "0"),
      year.length === 0 ? currentYear : year.padEnd(4, "0"),
    ].join("/");

    setInputValue(formattedValue);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const position = inputRef.current?.selectionStart || 0;

    if (event.key === "ArrowLeft") {
      handleFixFormat();
      if (position >= 0 && position <= 1) {
        setTimeout(() => {
          inputRef.current?.setSelectionRange(6, 10); // Select year
        }, 0);
      } else if (position >= 3 && position <= 5) {
        setTimeout(() => {
          inputRef.current?.setSelectionRange(0, 2); // Select day
        }, 0);
      } else if (position >= 6) {
        setTimeout(() => {
          inputRef.current?.setSelectionRange(3, 5); // Select month
        }, 0);
      }
      event.preventDefault();
    } else if (event.key === "ArrowRight") {
      handleFixFormat();
      if (position >= 0 && position <= 1) {
        setTimeout(() => {
          inputRef.current?.setSelectionRange(3, 5); // Select month
        }, 0);
      } else if (position >= 3 && position <= 5) {
        setTimeout(() => {
          inputRef.current?.setSelectionRange(6, 10); // Select year
        }, 0);
      } else if (position >= 6) {
        setTimeout(() => {
          inputRef.current?.setSelectionRange(0, 2); // Select day
        }, 0);
      }
      event.preventDefault();
    } else if (event.key === "Escape") {
      inputRef.current?.blur();
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleFixFormat();
      const parsed = parse(inputValue, "dd/MM/yyyy", new Date());
      onDateChange(parsed);
      setTimeout(() => {
        inputRef.current?.blur();
      }, 0);
    } else if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
      event.preventDefault();
    }
  }

  function handleFocus() {
    const position = inputRef.current?.selectionStart || 0;

    if (inputValue === "") {
      setInputValue(format(new Date(), "dd/MM/yyyy"));
      // Start
      setTimeout(() => {
        inputRef.current?.setSelectionRange(0, 2);
      }, 0);
    } else if (position >= 0 && position <= 1) {
      handleFixFormat();
      // Day
      setTimeout(() => {
        inputRef.current?.setSelectionRange(0, 2);
      }, 0);
    } else if (position >= 2 && position <= 4) {
      handleFixFormat();
      // Month
      setTimeout(() => {
        inputRef.current?.setSelectionRange(3, 5);
      }, 0);
    } else if (position >= 5) {
      handleFixFormat();
      // Year
      setTimeout(() => {
        inputRef.current?.setSelectionRange(6, 10);
      }, 0);
    }
  }

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
        onFocus={() => {
          handleFocus();
          handleToggleCalendar();
        }}
        onClick={handleFocus}
        onKeyDown={handleKeyDown}
        className="border rounded-md border-gray-300 p-2 flex-1"
        placeholder="dd/mm/yyyy"
        maxLength={10}
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
