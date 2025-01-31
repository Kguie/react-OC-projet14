import { format, parse } from "date-fns";
import { useRef, useState } from "react";
import { Noop } from "react-hook-form";

import DatePickerCalendar from "./DatePickerCalendar";
import {
  handleCalendarDate,
  handleCalendarMonth,
} from "../../utils/datePicker";

type DatePickerProps = {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
  controlOnBlur?: Noop;
  error?: boolean;
  required?: boolean;
};

export default function DatePicker({
  selectedDate,
  onDateChange,
  controlOnBlur,
  error,
  required,
}: DatePickerProps): React.ReactElement {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""
  );
  const [position, setPosition] = useState<"top" | "bottom">("bottom");

  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  /** Open calendar adjusting the position */
  function handleOpenCalendar() {
    if (isCalendarOpen) return;

    setIsCalendarOpen(true);
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < 384 && spaceAbove > 384) {
        setPosition("top");
      } else {
        setPosition("bottom");
      }
    }
  }

  /** Handle blur with modal closing and input checking */
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

  /** Update the text input date checking that the entered text corresponds to a formatted date */
  function handleDateInputChange(event?: React.ChangeEvent<HTMLInputElement>) {
    const value = event ? event.target.value : inputValue;
    const sanitizedValue = value.replace(/[^0-9/]/g, "");
    const [day, month, year] = sanitizedValue.split("/");

    if (event) {
      const formattedValue = [
        handleCalendarDate(day, month, year),
        handleCalendarMonth(month),
        year,
      ].join("/");

      setInputValue(formattedValue);
    } else {
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
  }

  /** Handle select and navigation between day, month and year segments */
  function handleDateNavigation(
    position: number,
    direction: "next" | "previous" | "current"
  ) {
    handleDateInputChange();

    const ranges = [
      { start: 0, end: 2 }, // Day
      { start: 3, end: 5 }, // Month
      { start: 6, end: 10 }, // Year
    ];

    const currentRangeIndex = position <= 1 ? 0 : position <= 4 ? 1 : 2;

    const nextRangeIndex =
      direction === "next"
        ? (currentRangeIndex + 1) % ranges.length
        : direction === "previous"
        ? (currentRangeIndex + ranges.length - 1) % ranges.length
        : currentRangeIndex;

    const { start, end } = ranges[nextRangeIndex];
    setTimeout(() => {
      inputRef.current?.setSelectionRange(start, end);
    }, 0);
  }

  /** Handle text generate and select, at focus and click */
  function handleFocus() {
    const position = inputRef.current?.selectionStart || 0;

    if (inputValue === "") {
      setInputValue(format(new Date(), "dd/MM/yyyy"));
      setTimeout(() => {
        inputRef.current?.setSelectionRange(0, 2);
      }, 0);
    } else {
      handleDateNavigation(position, "current");
    }
    handleOpenCalendar();
  }

  /** Update Date on click on Calendar component date */
  function handleCalendarChange(date: Date) {
    setInputValue(format(date, "dd/MM/yyyy"));
    onDateChange(date);
    setIsCalendarOpen(false);
    if (controlOnBlur && error) {
      controlOnBlur();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const position = inputRef.current?.selectionStart || 0;

    switch (event.key) {
      case "ArrowLeft":
        handleDateNavigation(position, "previous");
        event.preventDefault();
        break;

      case "ArrowRight":
        handleDateNavigation(position, "next");
        event.preventDefault();
        break;

      case "Escape":
        inputRef.current?.blur();
        break;

      case "Enter": {
        event.preventDefault();
        handleDateInputChange();
        const parsed = parse(inputValue, "dd/MM/yyyy", new Date());
        onDateChange(parsed);
        setTimeout(() => {
          inputRef.current?.blur();
        }, 0);
        break;
      }

      case "Tab":
        inputRef.current?.blur();
        break;

      default:
        if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
          event.preventDefault();
        }
        break;
    }
  }

  return (
    <div onBlur={handleBlur} className="relative flex flex-1">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleDateInputChange}
        onFocus={handleFocus}
        onClick={handleFocus}
        onBlur={controlOnBlur}
        onKeyDown={handleKeyDown}
        className={`border rounded-md border-gray-300 p-2 flex-1 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="dd/mm/yyyy"
        maxLength={10}
        required={required}
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
