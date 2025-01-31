import { Control, Controller, FieldErrors } from "react-hook-form";

import { CreateEmployeeFormData } from "./CreateEmployeeForm";
import { formatLabelToKebabCase } from "../../utils/utils";
import DatePicker from "../datePicker/DatePicker";

export type CreateEmployeeFormTextInputProps = {
  name: "dateOfBirth" | "startDate";
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
        render={({ field }) => {
          const { value, onChange, onBlur } = field;
          return (
            <DatePicker
              selectedDate={value}
              onDateChange={onChange}
              controlOnBlur={onBlur}
              error={!!errors[name]}
              required
            />
          );
        }}
      />
      {errors[name] && <p className="text-red-500">{errors[name]?.message}</p>}
    </div>
  );
}
