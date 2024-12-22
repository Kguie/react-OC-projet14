import { Control, Controller, FieldErrors } from "react-hook-form";

import { CreateEmployeeFormData } from "./CreateEmployeeForm";
import { formatLabelToKebabCase } from "../../utils/utils";
import CreateEmployeeFormInputBody from "./CreateEmployeeFormInputBody";

export type CreateEmployeeFormInputProps =
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

export default function CreateEmployeeFormInput({
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
          <CreateEmployeeFormInputBody
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
