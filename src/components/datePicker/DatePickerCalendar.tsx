import { useMemo, useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
} from "date-fns";
import { ChevronLeft, ChevronRight, House } from "lucide-react";

type DatePickerCalendarProps = {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
};

export default function DatePickerCalendar({
  selectedDate,
  onDateChange,
}: DatePickerCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  function generateCalendarDays() {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const days = useMemo(() => generateCalendarDays(), [currentMonth]);

  return (
    <div className="w-66 border rounded-lg p-4">
      {/* En-tête du calendrier */}
      <div className="flex justify-between items-center mb-4">
        <button type="button" onClick={prevMonth}>
          <ChevronLeft className="text-gray-600 hover:text-black cursor-pointer" />
        </button>
        <button type="button" className="flex gap-4 items-center">
          <House
            onClick={() => onDateChange(new Date())}
            className="text-gray-600 hover:text-black cursor-pointer"
          />
          <p className="text-lg font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </p>
        </button>
        <button type="button" onClick={nextMonth}>
          <ChevronRight className="text-gray-600 hover:text-black cursor-pointer" />
        </button>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-2 text-center font-bold text-gray-600">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Jours du calendrier */}
      <div className="grid grid-cols-7 gap-2 mt-2">
        {days.map((day) => {
          const isToday = isSameDay(day, new Date());
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isOutsideCurrentMonth =
            day.getMonth() !== currentMonth.getMonth();

          return (
            <button
              key={day.toString()}
              onClick={() => {
                onDateChange(day);
              }}
              className={`p-2 rounded-full text-center ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : isToday
                  ? "bg-gray-200"
                  : "bg-white"
              } ${
                isOutsideCurrentMonth ? "text-gray-400" : "text-black"
              } hover:bg-blue-100`}>
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
