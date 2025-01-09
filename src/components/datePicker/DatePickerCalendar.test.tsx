import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { format } from "date-fns";

import DatePickerCalendar from "./DatePickerCalendar";
import { render } from "../../utils/test";

describe("DatePickerCalendar", () => {
  const onDateChangeMock = vi.fn();

  const renderDatePicker = (selectedDate: Date | null = null) => {
    render(
      <DatePickerCalendar
        selectedDate={selectedDate}
        onDateChange={onDateChangeMock}
      />
    );
  };

  it("renders the calendar with the correct initial month", () => {
    const today = new Date();
    renderDatePicker(today);

    const monthYearText = format(today, "MMMM yyyy");
    expect(screen.getByText(monthYearText)).toBeInTheDocument();
  });

  it("renders the days of the week", () => {
    renderDatePicker();

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    daysOfWeek.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it("navigates to the previous month when the left chevron is clicked", async () => {
    const today = new Date();
    renderDatePicker(today);

    const prevButton = screen.getAllByRole("button")[0];
    await userEvent.click(prevButton);

    const previousMonth = format(
      new Date(today.setMonth(today.getMonth() - 1)),
      "MMMM yyyy"
    );
    expect(screen.getByText(previousMonth)).toBeInTheDocument();
  });

  it("navigates to the next month when the right chevron is clicked", async () => {
    const today = new Date();
    renderDatePicker(today);

    const nextButton = screen.getAllByRole("button")[2];
    await userEvent.click(nextButton);

    const nextMonth = format(
      new Date(today.setMonth(today.getMonth() + 1)),
      "MMMM yyyy"
    );
    expect(screen.getByText(nextMonth)).toBeInTheDocument();
  });

  it("calls onDateChange  when the house icon is clicked", async () => {
    renderDatePicker();

    const houseIcon = screen.getAllByRole("button")[1];
    await userEvent.click(houseIcon);

    expect(onDateChangeMock).toHaveBeenCalled();
  });

  it("calls onDateChange  when a day is clicked", async () => {
    renderDatePicker();

    const today = new Date();
    const todayDateButton = screen.getByText(today.getDate().toString());
    await userEvent.click(todayDateButton);

    expect(onDateChangeMock).toHaveBeenCalled();
  });

  it("highlights the selected date", () => {
    const selectedDate = new Date(2023, 11, 25);
    renderDatePicker(selectedDate);

    const selectedDayButton = screen.getByText(
      selectedDate.getDate().toString()
    );
    expect(selectedDayButton).toHaveClass("bg-blue-500 text-white");
  });
});
