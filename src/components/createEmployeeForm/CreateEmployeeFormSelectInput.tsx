import { Control, Controller, FieldErrors } from "react-hook-form";

import { CreateEmployeeFormData } from "./CreateEmployeeForm";
import { formatLabelToKebabCase } from "../../utils/utils";

type CreateEmployeeFormSelectInputProps = {
  name: "state" | "department";
  label: string;
  control: Control<CreateEmployeeFormData>;
  errors: FieldErrors<CreateEmployeeFormData>;
  options: { label: string; value: string }[];
};

export default function CreateEmployeeFormSelectInput({
  name,
  label,
  control,
  errors,
  options,
}: CreateEmployeeFormSelectInputProps): React.ReactElement {
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
          <select
            id={kebabCaseLabel}
            required
            className={`border rounded-md ${
              errors[name] ? "border-red-500" : "border-gray-300"
            } p-2`}
            {...field}>
            <Options options={options} />
          </select>
        )}
      />
      {errors[name] && <p className="text-red-500">{errors[name]?.message}</p>}
    </div>
  );
}

function Options({
  options,
}: {
  options: CreateEmployeeFormSelectInputProps["options"];
}) {
  return (
    <>
      {options.map(({ value, label }, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </>
  );
}
