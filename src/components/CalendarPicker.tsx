import { useState } from "react";
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

type CalendarPickerProps = {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
};

export default function CalendarPicker({
  selectedDate,
  onDateChange,
}: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Gestion de la navigation
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Génération des jours du calendrier
  const generateCalendarDays = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const days = generateCalendarDays();

  return (
    <div className="w-64 border rounded-lg p-4">
      {/* En-tête du calendrier */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-gray-600 hover:text-black">
          &lt;
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={nextMonth} className="text-gray-600 hover:text-black">
          &gt;
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
              onClick={() => onDateChange(day)}
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
