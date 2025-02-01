import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import DropdownMenu, { DropdownMenuOption } from "./DropdownMenu";

describe("DropdownMenu Component", () => {
  const mockOptions: DropdownMenuOption[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const onSelectMock = vi.fn();

  const renderDropdownMenu = (
    selected: DropdownMenuOption["value"] | null = null
  ) => {
    render(
      <DropdownMenu
        selected={selected}
        onSelect={onSelectMock}
        options={mockOptions}
      />
    );
  };

  it("renders the input with a placeholder", () => {
    renderDropdownMenu();
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Select your option");
  });

  it("displays the selected option in the input", () => {
    renderDropdownMenu("option2");
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Option 2");
  });

  it("opens the dropdown menu when the input is clicked", async () => {
    renderDropdownMenu();
    const input = screen.getByRole("textbox");

    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toHaveClass("opacity-0");

    await userEvent.click(input);

    await waitFor(
      () => {
        const dropdown = screen.getByTestId("dropdown");
        expect(dropdown).toHaveClass("opacity-100");
      },
      { timeout: 300 }
    );
  });

  it("closes the dropdown menu when clicking outside", async () => {
    renderDropdownMenu();
    const input = screen.getByRole("textbox");

    await userEvent.click(input);
    await waitFor(
      () => {
        const dropdown = screen.getByTestId("dropdown");
        expect(dropdown).toHaveClass("opacity-100");
      },
      { timeout: 300 }
    );

    await userEvent.click(document.body);
    await waitFor(
      () => {
        const dropdown = screen.getByTestId("dropdown");
        expect(dropdown).toHaveClass("opacity-0");
      },
      { timeout: 300 }
    );
  });

  it("calls onSelect with the correct value when an option is clicked", async () => {
    renderDropdownMenu();
    const input = screen.getByRole("textbox");
    await userEvent.click(input);

    const option2 = screen.getByText("Option 2");
    await userEvent.click(option2);

    expect(onSelectMock).toHaveBeenCalledWith("option2");
    await waitFor(
      () => {
        const dropdown = screen.getByTestId("dropdown");
        expect(dropdown).toHaveClass("opacity-0");
      },
      { timeout: 300 }
    );
  });

  it("closes the dropdown if clicking on the input again", async () => {
    renderDropdownMenu();
    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    await waitFor(
      () => {
        const dropdown = screen.getByTestId("dropdown");
        expect(dropdown).toHaveClass("opacity-100");
      },
      { timeout: 300 }
    );

    await userEvent.click(input);
    await waitFor(
      () => {
        const dropdown = screen.getByTestId("dropdown");
        expect(dropdown).toHaveClass("opacity-0");
      },
      { timeout: 300 }
    );
  });

  it("highlights the correct option when navigating with keyboard", async () => {
    renderDropdownMenu();
    const input = screen.getByRole("textbox");
    await userEvent.click(input);

    await userEvent.keyboard("{ArrowDown}");
    const options1Buttons = screen.getAllByText("Option 1");
    expect(options1Buttons[options1Buttons.length - 1]).toHaveClass(
      "bg-primary"
    );

    await userEvent.keyboard("{ArrowDown}");
    const options2Buttons = screen.getAllByText("Option 2");
    expect(options2Buttons[options2Buttons.length - 1]).toHaveClass(
      "bg-primary"
    );

    await userEvent.keyboard("{ArrowUp}");
    expect(options1Buttons[options1Buttons.length - 1]).toHaveClass(
      "bg-primary"
    );
  });

  it("selects the highlighted option with Enter", async () => {
    renderDropdownMenu();
    const input = screen.getByRole("textbox");
    await userEvent.click(input);

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");

    expect(screen.getByRole("textbox")).toHaveValue("Option 1");
    await waitFor(
      () => {
        const dropdown = screen.getByTestId("dropdown");
        expect(dropdown).toHaveClass("opacity-0");
      },
      { timeout: 300 }
    );
  });

  it("closes the dropdown menu when Escape is pressed", async () => {
    renderDropdownMenu();
    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    await waitFor(
      () => {
        const dropdown = screen.getByTestId("dropdown");
        expect(dropdown).toHaveClass("opacity-100");
      },
      { timeout: 300 }
    );

    await userEvent.keyboard("{Escape}");
    await waitFor(
      () => {
        const dropdown = screen.getByTestId("dropdown");
        expect(dropdown).toHaveClass("opacity-0");
      },
      { timeout: 300 }
    );
  });
});
