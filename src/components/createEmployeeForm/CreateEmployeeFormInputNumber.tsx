import { useCallback, useRef } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import debounce from "lodash.debounce";

import { CreateEmployeeFormData } from "./CreateEmployeeForm";
import { formatLabelToKebabCase } from "../../utils/utils";

export type CreateEmployeeFormInputNumberProps = {
  name: "zipCode";
  label: string;
  control: Control<CreateEmployeeFormData>;
  errors: FieldErrors<CreateEmployeeFormData>;
};

export default function CreateEmployeeFormInputNumber({
  name,
  label,
  control,
  errors,
}: CreateEmployeeFormInputNumberProps): React.ReactElement {
  const kebabCaseLabel = formatLabelToKebabCase(label);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Débounce pour appliquer le padStart après 3.5s d'inactivité
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFormatValue = useCallback(debounce(formatValue, 3500), []);

  function formatValue(val: string, onChange: (value: string) => void) {
    if (val.length < 5) {
      val = val.padStart(5, "0");
      onChange(val);
      if (inputRef.current) {
        inputRef.current.value = val;
      }
    }
  }

  return (
    <div className="flex flex-col flex-1 gap-2">
      <label className="text-gray-600" htmlFor={kebabCaseLabel}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: `${label} is required`,
          validate: (value) => value !== "00000" || "Select a valid zip code",
        }}
        render={({ field }) => {
          const { onChange, value, onBlur, ref } = field;

          if (value === undefined || value === null) {
            formatValue("0", onChange);
          }

          return (
            <input
              type="number"
              id={kebabCaseLabel}
              onWheel={(e) => e.currentTarget.blur()}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                  e.preventDefault();
                  let newValue = parseInt(value);

                  if (e.key === "ArrowUp" && newValue < 99999) {
                    newValue++;
                  } else if (e.key === "ArrowDown" && newValue > 1) {
                    newValue--;
                  }
                  formatValue(newValue.toString(), onChange);
                }
              }}
              min={1}
              maxLength={5}
              minLength={1}
              max={99999}
              ref={(el) => {
                ref(el);
                inputRef.current = el;
              }}
              value={value}
              onInput={(e) => {
                const input = e.currentTarget;
                input.value = input.value.replace(/\D/g, "").trim();
                if (input.value.length > 5) {
                  input.value = input.value.slice(0, 5);
                }
              }}
              onBlur={(e) => {
                const val = e.target.value.slice(0, 5);
                formatValue(val, onChange);
                onBlur();
                console.log(value);
              }}
              onChange={(e) => {
                const val = e.target.value.slice(0, 5);
                onChange(val);
                if (
                  e.nativeEvent instanceof InputEvent &&
                  e.nativeEvent.inputType
                ) {
                  debouncedFormatValue(val, onChange);
                } else {
                  formatValue(val, onChange);
                }
                if (errors[name]) onBlur();
              }}
              required
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
