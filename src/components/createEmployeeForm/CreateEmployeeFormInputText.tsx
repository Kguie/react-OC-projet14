import { Control, Controller, FieldErrors } from "react-hook-form";

import { CreateEmployeeFormData } from "./CreateEmployeeForm";
import { formatLabelToKebabCase } from "../../utils/utils";

export type CreateEmployeeFormInputTextProps = {
  name: "firstName" | "lastName" | "street" | "city";
  label: string;
  control: Control<CreateEmployeeFormData>;
  errors: FieldErrors<CreateEmployeeFormData>;
};

export default function CreateEmployeeFormInputText({
  name,
  label,
  control,
  errors,
}: CreateEmployeeFormInputTextProps): React.ReactElement {
  const kebabCaseLabel = formatLabelToKebabCase(label);
  return (
    <div className="flex flex-col flex-1 gap-2">
      <label className="text-gray-600" htmlFor={kebabCaseLabel}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field }) => {
          const { value, ...restField } = field;
          return (
            <input
              {...restField}
              type="text"
              id={kebabCaseLabel}
              required
              value={value ?? ""}
              className={`border rounded-md ${
                errors[name] ? "border-red-500" : "border-gray-300"
              } p-2`}
            />
          );
        }}
      />
      {errors[name] && <p className="text-red-500">{errors[name]?.message}</p>}
    </div>
  );
}
