import { ControllerRenderProps, FieldErrors } from "react-hook-form";

import { CreateEmployeeFormData } from "./CreateEmployeeForm";
import { CreateEmployeeFormInputProps } from "./CreateEmployeeFormInput";

type CreateEmployeeFormInputBodyProps = {
  inputType: "select" | "text" | "date";
  options?: { label: string; value: string }[];
  errors: FieldErrors<CreateEmployeeFormData>;
  id: string;
  name: CreateEmployeeFormInputProps["name"];
  field: ControllerRenderProps<
    CreateEmployeeFormData,
    CreateEmployeeFormInputProps["name"]
  >;
};

export default function CreateEmployeeFormInputBody({
  errors,
  options,
  inputType,
  field,
  id,
  name,
}: CreateEmployeeFormInputBodyProps) {
  if (inputType === "select" && options) {
    return (
      <select
        id={id}
        required
        className={`border rounded-md ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } p-2`}
        {...field}>
        {options.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  }
  return (
    <input
      type={inputType}
      id={id}
      required
      className={`border rounded-md ${
        errors[name] ? "border-red-500" : "border-gray-300"
      } p-2`}
      {...field}
    />
  );
}
