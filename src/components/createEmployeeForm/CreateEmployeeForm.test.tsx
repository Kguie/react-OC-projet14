import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import CreateEmployeeForm from "./CreateEmployeeForm";
import { render } from "../../utils/test";
import * as employeeAPI from "../../utils/hooks/api/employees";

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
  });

  describe("CreateEmployeeForm validation", () => {
    let handleCreateEmployee: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      handleCreateEmployee = vi.fn();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should not call the submit function if all fields are not populated", async () => {
      render(<CreateEmployeeForm />);

      const submitButton = screen.getByRole("button", { name: "Save" });
      await userEvent.click(submitButton);

      expect(handleCreateEmployee).not.toHaveBeenCalled();

      expect(screen.getByTestId("modal")).toHaveClass("hidden");
    });

    it("should call the submit function and open the modal if the form is complete", async () => {
      vi.spyOn(employeeAPI, "useCreateEmployee").mockReturnValue({
        handleCreateEmployee,
        isLoading: false,
        error: null,
      });
      render(<CreateEmployeeForm />);

      await userEvent.type(screen.getByLabelText("First Name"), "John");
      await userEvent.type(screen.getByLabelText("Last Name"), "Stark");
      await userEvent.type(screen.getByLabelText("Street"), "Stark Tower");
      await userEvent.type(screen.getByLabelText("City"), "New York");
      await userEvent.type(screen.getByLabelText("Zip Code"), "12345");

      const birthInput = screen.getAllByPlaceholderText("dd/mm/yyyy")[0];
      const startInput = screen.getAllByPlaceholderText("dd/mm/yyyy")[1];

      await userEvent.type(birthInput, "01/01/2000{enter}");
      await userEvent.type(startInput, "01/01/2023{enter}");

      const selectInputs = screen.getAllByTestId("dropdownInput");
      const stateInput = selectInputs[0];
      const departmentInput = selectInputs[1];

      await userEvent.click(stateInput);
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{Enter}");

      await userEvent.click(departmentInput);
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{Enter}");

      // On clique sur le bouton de soumission
      const submitButton = screen.getByRole("button", { name: "Save" });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
      });

      expect(handleCreateEmployee).toHaveBeenCalledTimes(1);
      await waitFor(() => {
        expect(screen.getByTestId("modal")).toHaveClass("flex");
        expect(
          screen.getByText("John Stark has been registered")
        ).toBeInTheDocument();
      });
    });

    it("should display an error message in the modal when handleCreateEmployee fails", async () => {
      // Mock `useCreateEmployee` pour simuler une erreur
      vi.spyOn(employeeAPI, "useCreateEmployee").mockReturnValue({
        handleCreateEmployee,
        isLoading: false,
        error: "Failed to create employee",
      });

      render(<CreateEmployeeForm />);

      await userEvent.type(screen.getByLabelText("First Name"), "John");
      await userEvent.type(screen.getByLabelText("Last Name"), "Stark");
      await userEvent.type(screen.getByLabelText("Street"), "Stark Tower");
      await userEvent.type(screen.getByLabelText("City"), "New York");
      await userEvent.type(screen.getByLabelText("Zip Code"), "12345");

      const birthInput = screen.getAllByPlaceholderText("dd/mm/yyyy")[0];
      const startInput = screen.getAllByPlaceholderText("dd/mm/yyyy")[1];

      await userEvent.type(birthInput, "01/01/2000{enter}");
      await userEvent.type(startInput, "01/01/2023{enter}");

      const selectInputs = screen.getAllByTestId("dropdownInput");
      const stateInput = selectInputs[0];
      const departmentInput = selectInputs[1];

      await userEvent.click(stateInput);
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{Enter}");

      await userEvent.click(departmentInput);
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{Enter}");

      // On clique sur le bouton de soumission
      const submitButton = screen.getByRole("button", { name: "Save" });
      await userEvent.click(submitButton);

      expect(handleCreateEmployee).toHaveBeenCalledTimes(1);

      // Vérifie que la modale affiche le message d'erreur
      await waitFor(() => {
        expect(screen.getByTestId("modal")).toHaveClass("flex");
        expect(
          screen.getByText("Failed to create employee")
        ).toBeInTheDocument();
      });
    });
  });
});
