import { ControllerRenderProps, FieldErrors } from "react-hook-form";

import { CreateEmployeeFormData } from "./CreateEmployeeForm";
import { CreateEmployeeFormInputProps } from "./CreateEmployeeFormInput";

type CreateEmployeeFormInputBodyProps = {
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
  field,
  id,
  name,
}: CreateEmployeeFormInputBodyProps) {
  return (
    <input
      type="date"
      id={id}
      required
      className={`border rounded-md ${
        errors[name] ? "border-red-500" : "border-gray-300"
      } p-2`}
      {...field}
    />
  );
}
