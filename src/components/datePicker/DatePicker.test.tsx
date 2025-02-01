import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import DatePicker from "./DatePicker";
import { format } from "date-fns";

describe("DatePicker Component", () => {
  const onDateChangeMock = vi.fn();

  const renderDatePicker = (selectedDate: Date | null = null) => {
    render(
      <DatePicker selectedDate={selectedDate} onDateChange={onDateChangeMock} />
    );
  };

  it("renders the input with the correct placeholder", () => {
    renderDatePicker();
    const input = screen.getByPlaceholderText("dd/mm/yyyy");
    expect(input).toBeInTheDocument();
  });

  it("displays the formatted selected date in the input", () => {
    const selectedDate = new Date(2023, 11, 25); // December 25, 2023
    renderDatePicker(selectedDate);
    const input = screen.getByPlaceholderText("dd/mm/yyyy");
    expect(input).toHaveValue(format(selectedDate, "dd/MM/yyyy"));
  });

  it("opens the calendar on input focus", async () => {
    renderDatePicker();
    const input = screen.getByPlaceholderText("dd/mm/yyyy");
    await userEvent.click(input);

    const calendar = screen.getByTestId("calendar");
    expect(calendar).toBeInTheDocument();
  });

  it("closes the calendar on blur", async () => {
    renderDatePicker();
    const input = screen.getByPlaceholderText("dd/mm/yyyy");
    await userEvent.click(input);

    const calendar = screen.getByTestId("calendar");
    expect(calendar).toBeInTheDocument();

    await userEvent.tab();
    expect(calendar).not.toBeInTheDocument();
  });

  it("updates the date when a valid input is entered", async () => {
    renderDatePicker();
    const input = screen.getByPlaceholderText("dd/mm/yyyy");

    await userEvent.type(input, "25/12/2023{enter}");
    expect(onDateChangeMock).toHaveBeenCalled();
  });

  it("restores the original date if the input is invalid on blur", async () => {
    const selectedDate = new Date(2023, 11, 25); // December 25, 2023
    renderDatePicker(selectedDate);

    const input = screen.getByPlaceholderText("dd/mm/yyyy");
    await userEvent.type(input, "invalid date");
    input.blur();

    expect(input).toHaveValue(format(selectedDate, "25/12/2023"));
  });

  it("allows navigation between day, month, and year segments", async () => {
    const selectedDate = new Date(2023, 11, 25); // December 25, 2023
    renderDatePicker(selectedDate);
    const input = screen.getByDisplayValue("25/12/2023") as HTMLInputElement;

    await userEvent.click(input);
    expect(input.selectionStart).toBe(6); // Year

    await userEvent.keyboard("{ArrowRight}");
    expect(input.selectionStart).toBe(0); // Day

    await userEvent.keyboard("{ArrowRight}");
    expect(input.selectionStart).toBe(3); // Month

    await userEvent.keyboard("{ArrowLeft}");
    expect(input.selectionStart).toBe(0); // Back to day
  });

  it("updates the selected date when a date is clicked in the calendar", async () => {
    renderDatePicker();

    const input = screen.getByPlaceholderText("dd/mm/yyyy");
    await userEvent.click(input);

    const today = new Date();
    const todayDateButtons = screen.getAllByText(today.getDate().toString());
    const todayButton = todayDateButtons[todayDateButtons.length - 1];

    await userEvent.click(todayButton);

    expect(onDateChangeMock).toHaveBeenCalled();
    expect(input).toHaveValue(format(today, "dd/MM/yyyy"));
  });

  it("handles the Escape key to close the calendar", async () => {
    renderDatePicker();
    const input = screen.getByPlaceholderText("dd/mm/yyyy");

    await userEvent.click(input); // Open the calendar
    expect(screen.getByTestId("calendar")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByTestId("calendar")).not.toBeInTheDocument();
  });
});
