import { useState } from "react";
import { useForm } from "react-hook-form";
import { formatDate } from "date-fns/format";

import Separator from "../Separator";
import CreateEmployeeFormInputText from "./CreateEmployeeFormInputText";
import CreateEmployeeFormInputSelect from "./CreateEmployeeFormInputSelect";
import CreateEmployeeFormInputDate from "./CreateEmployeeFormInputDate";
import Button from "../Button";
import CreateEmployeeFormModal from "./CreateEmployeeFormModal";
import CreateEmployeeFormInputNumber from "./CreateEmployeeFormInputNumber";
import {
  EmployeeDTO,
  useCreateEmployee,
} from "../../utils/hooks/api/employees";
import { DEPARTMENTS, STATES } from "../data/data";

export type CreateEmployeeFormData = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  startDate: Date;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
};

export default function CreateEmployeeForm(): React.ReactNode {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { handleCreateEmployee, isLoading, error } = useCreateEmployee();

  const {
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm<CreateEmployeeFormData>({
    mode: "onBlur",
  });
  function onSubmit(data: CreateEmployeeFormData) {
    const {
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      department,
      street,
      city,
      state,
      zipCode,
    } = data;
    const payload: EmployeeDTO = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      startDate: formatDate(startDate, "yyyy-MM-dd"),
      dateOfBirth: formatDate(dateOfBirth, "yyyy-MM-dd"),
      department,
      address: {
        city: city.trim(),
        state,
        street: street.trim(),
        zipCode,
      },
    };
    try {
      handleCreateEmployee(payload);
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(true);
    }
  }

  function handleCloseModal() {
    if (!error) reset();
    setIsModalOpen(false);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="create-employee"
        className="space-y-4 flex flex-col gap-6">
        <fieldset className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <CreateEmployeeFormInputText
              name="firstName"
              label="First Name"
              control={control}
              errors={errors}
            />
            <CreateEmployeeFormInputText
              name="lastName"
              label="Last Name"
              control={control}
              errors={errors}
            />
          </div>

          <div className="flex flex-col gap-4">
            <CreateEmployeeFormInputDate
              name="dateOfBirth"
              label="Date Of Birth"
              control={control}
              errors={errors}
            />
            <CreateEmployeeFormInputDate
              name="startDate"
              label="Start Date"
              control={control}
              errors={errors}
            />
          </div>
        </fieldset>
        {/* Address */}
        <Separator />
        <fieldset className="space-y-4 ">
          <legend className="text-gray-800 font-semibold">Address</legend>
          <div className="flex flex-col md:flex-row gap-4">
            <CreateEmployeeFormInputText
              name="street"
              label="Street"
              control={control}
              errors={errors}
            />
            <CreateEmployeeFormInputText
              name="city"
              label="City"
              control={control}
              errors={errors}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <CreateEmployeeFormInputSelect
              name="state"
              label="State"
              control={control}
              errors={errors}
              options={STATES}
            />
            <CreateEmployeeFormInputNumber
              name="zipCode"
              label="Zip Code"
              control={control}
              errors={errors}
            />
          </div>
        </fieldset>
        <Separator />

        <fieldset className="space-y-4 ">
          <CreateEmployeeFormInputSelect
            name="department"
            label="Department"
            control={control}
            errors={errors}
            options={DEPARTMENTS}
          />
        </fieldset>
        {/* Submit Button */}
        <Button
          data-testid="submit-button"
          type="submit"
          title="Save"
          isLoading={isLoading}
        />
      </form>
      <CreateEmployeeFormModal
        isOpen={isModalOpen}
        close={handleCloseModal}
        isError={!!error}
        message={
          error ||
          `${getValues("firstName")} ${getValues(
            "lastName"
          )} has been registered`
        }
      />
    </>
  );
}
