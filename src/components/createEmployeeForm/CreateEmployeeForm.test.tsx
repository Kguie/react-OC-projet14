import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import CreateEmployeeForm from "./CreateEmployeeForm";
import { render } from "../../utils/test";

describe("CreateEmployeeForm Component", () => {
  describe("CreateEmployeeFormInputText component", () => {
    it("Should display 4 inputs", () => {
      render(<CreateEmployeeForm />);
      const inputs = screen.getAllByTestId("formTextInput");
      expect(inputs).toHaveLength(4);
    });
    it("Should display an error message if left empty", async () => {
      render(<CreateEmployeeForm />);
      const input = screen.getAllByTestId("formTextInput")[0];
      await userEvent.click(input);

      await userEvent.tab();
      expect(screen.getAllByTestId("formTextInput")[0]).toHaveClass(
        "border-red-500"
      );
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });
    it("Should update value correctly", async () => {
      render(<CreateEmployeeForm />);
      const input = screen.getAllByTestId("formTextInput")[0];
      await userEvent.click(input);

      await userEvent.type(input, "Tony{enter}");
      expect(screen.getAllByTestId("formTextInput")[0]).toHaveValue("Tony");
    });
  });
  describe("CreateEmployeeFormInputDate component", () => {
    it("Should display 2 inputs", () => {
      render(<CreateEmployeeForm />);
      const inputs = screen.getAllByTestId("datePicker");
      expect(inputs).toHaveLength(2);
    });
    it("Should display an error message if left empty", async () => {
      render(<CreateEmployeeForm />);
      const input = screen.getAllByTestId("datePicker")[0];
      await userEvent.click(input);

      await userEvent.tab();
      expect(screen.getAllByTestId("datePicker")[0]).toHaveClass(
        "border-red-500"
      );
      expect(
        screen.getByText(/Date Of Birth is required/i)
      ).toBeInTheDocument();
    });
  });
  describe("CreateEmployeeFormInputSelect component", () => {
    it("Should display 4 inputs", () => {
      render(<CreateEmployeeForm />);
      const inputs = screen.getAllByTestId("dropdownInput");
      expect(inputs).toHaveLength(2);
    });
    it("Should display an error message if left empty", async () => {
      render(<CreateEmployeeForm />);
      const input = screen.getAllByTestId("dropdownInput")[0];
      await userEvent.click(input);

      await userEvent.tab();
      expect(screen.getAllByTestId("dropdownInput")[0]).toHaveClass(
        "border-red-500"
      );
      expect(screen.getByText(/State is required/i)).toBeInTheDocument();
    });
  });
  describe("CreateEmployeeFormInputNumber component", () => {
    it("Should display 4 inputs", () => {
      render(<CreateEmployeeForm />);
      const inputs = screen.getAllByTestId("formNumberInput");
      expect(inputs).toHaveLength(1);
    });
    it("Should display an error message if left empty", async () => {
      render(<CreateEmployeeForm />);
      const input = screen.getAllByTestId("formNumberInput")[0];
      await userEvent.click(input);

      await userEvent.tab();
      expect(screen.getAllByTestId("formNumberInput")[0]).toHaveClass(
        "border-red-500"
      );
      expect(screen.getByText(/Select a valid zip code/i)).toBeInTheDocument();
    });

    it("initializes with empty value and applies ", async () => {
      render(<CreateEmployeeForm />);
      const input = screen.getByLabelText("Zip Code");

      await userEvent.type(input, "12");
      expect(input).toHaveValue(12);
    });

    it("prevents non-numeric characters", async () => {
      render(<CreateEmployeeForm />);
      const input = screen.getByLabelText("Zip Code");

      await userEvent.type(input, "abc12");
      expect(input).toHaveValue(12);
    });

    it("limits input length to 5 digits", async () => {
      render(<CreateEmployeeForm />);
      const input = screen.getByLabelText("Zip Code");

      await userEvent.type(input, "12345");
      await userEvent.type(input, "678");
      expect(input).toHaveValue(12345);
    });

    // it("increments and decrements correctly with arrow keys", async () => {
    //   render(<CreateEmployeeForm />);
    //   const input = screen.getAllByTestId("formNumberInput")[0];

    //   await userEvent.click(input);
    //   await userEvent.keyboard("{ArrowUp}");
    //   await waitFor(() =>
    //     expect(screen.getByText("00001")).toBeInTheDocument()
    //   );

    //   await userEvent.keyboard("{ArrowDown}");
    //   await waitFor(() => expect(input).toHaveValue(12345));
    // });

    // it("does not allow values greater than 99999", async () => {
    //   render(<CreateEmployeeForm />);
    //   const input = screen.getByLabelText("Zip Code");

    //   await userEvent.type(input, "100000");

    //   await waitFor(() => expect(input).toHaveValue(9999), { timeout: 4000 });
    // });

    // it("does not allow values less than 1", async () => {
    //   render(<CreateEmployeeForm />);
    //   const input = screen.getByLabelText("Zip Code");

    //   userEvent.type(input, "0");

    //   await waitFor(() => expect(input).toHaveValue("00001")); // ✅ Min 1
    // });

    // it("displays an error message when '00000' is entered", async () => {
    //   render(<CreateEmployeeForm />);
    //   const input = screen.getByLabelText("Zip Code");

    //   userEvent.type(input, "00000");
    //   userEvent.tab();

    //   await waitFor(() => {
    //     expect(screen.getByText("Select a valid zip code")).toBeInTheDocument(); // ✅ Message d'erreur affiché
    //   });
    // });
  });
  // describe("CreateEmployeeForm validation", () => {
  //   it("Should display 4 inputs", () => {
  //     render(<CreateEmployeeForm />);
  //     const inputs = screen.getAllByTestId("formTextInput");
  //     expect(inputs).toHaveLength(4);
  //   });
  //   it("Should display an error message if left empty", async () => {
  //     render(<CreateEmployeeForm />);
  //     const input = screen.getAllByTestId("formTextInput")[0];
  //     await userEvent.click(input);

  //     await userEvent.tab();
  //     expect(screen.getAllByTestId("formTextInput")[0]).toHaveClass(
  //       "border-red-500"
  //     );
  //     expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
  //   });
  //   it("Should update value correctly", async () => {
  //     render(<CreateEmployeeForm />);
  //     const input = screen.getAllByTestId("formTextInput")[0];
  //     await userEvent.click(input);

  //     await userEvent.type(input, "Tony{enter}");
  //     expect(screen.getAllByTestId("formTextInput")[0]).toHaveValue("Tony");
  //   });
  // });
});
