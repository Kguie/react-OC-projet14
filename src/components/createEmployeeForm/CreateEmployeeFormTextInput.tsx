import { Control, Controller, FieldErrors } from "react-hook-form";

import { CreateEmployeeFormData } from "./CreateEmployeeForm";
import { formatLabelToKebabCase } from "../../utils/utils";

type CreateEmployeeFormTextInputProps = {
  name: "firstName" | "lastName" | "street" | "city" | "zipCode";
  label: string;
  control: Control<CreateEmployeeFormData>;
  errors: FieldErrors<CreateEmployeeFormData>;
};

export default function CreateEmployeeFormTextInput({
  name,
  label,
  control,
  errors,
}: CreateEmployeeFormTextInputProps): React.ReactElement {
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
        render={({ field }) => (
          <input
            type="text"
            id={kebabCaseLabel}
            required
            className={`border rounded-md ${
              errors[name] ? "border-red-500" : "border-gray-300"
            } p-2`}
            {...field}
          />
        )}
      />
      {errors[name] && <p className="text-red-500">{errors[name]?.message}</p>}
    </div>
  );
}
