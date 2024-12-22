import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldErrors,
} from "react-hook-form";

import { CreateEmployeeFormData } from "./CreateEmployeeForm";
import { formatLabelToKebabCase } from "../../utils/utils";

type CreateEmployeeFormInputProps =
  | {
      name: "state" | "department";
      label: string;
      options: { label: string; value: string }[];
      control: Control<CreateEmployeeFormData>;
      errors: FieldErrors<CreateEmployeeFormData>;
    }
  | {
      name:
        | "firstName"
        | "lastName"
        | "dateOfBirth"
        | "startDate"
        | "street"
        | "city"
        | "zipCode";
      label: string;
      options?: never;
      control: Control<CreateEmployeeFormData>;
      errors: FieldErrors<CreateEmployeeFormData>;
    };

type BodyProps = {
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

export default function CreateEmployeeFormTextInput({
  name,
  label,
  control,
  errors,
  options,
}: CreateEmployeeFormInputProps): React.ReactElement {
  const kebabCaseLabel = formatLabelToKebabCase(label);
  const inputType: "text" | "select" | "date" = options
    ? "select"
    : name.toLowerCase().includes("date")
    ? "date"
    : "text";

  return (
    <div className="flex flex-col flex-1 gap-2">
      <label className="text-gray-600" htmlFor={kebabCaseLabel}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field }) => (
          <Body
            errors={errors}
            options={options}
            field={field}
            id={kebabCaseLabel}
            inputType={inputType}
            name={name}
          />
        )}
      />
      {errors[name] && <p className="text-red-500">{errors[name]?.message}</p>}
    </div>
  );
}

function Body({ errors, options, inputType, field, id, name }: BodyProps) {
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
