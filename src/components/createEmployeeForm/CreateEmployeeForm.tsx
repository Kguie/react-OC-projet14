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
              options={states}
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
            options={departments}
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

const states: { value: string; label: string }[] = [
  {
    label: "Alabama",
    value: "AL",
  },
  {
    label: "Alaska",
    value: "AK",
  },
  {
    label: "American Samoa",
    value: "AS",
  },
  {
    label: "Arizona",
    value: "AZ",
  },
  {
    label: "Arkansas",
    value: "AR",
  },
  {
    label: "California",
    value: "CA",
  },
  {
    label: "Colorado",
    value: "CO",
  },
  {
    label: "Connecticut",
    value: "CT",
  },
  {
    label: "Delaware",
    value: "DE",
  },
  {
    label: "District Of Columbia",
    value: "DC",
  },
  {
    label: "Federated States Of Micronesia",
    value: "FM",
  },
  {
    label: "Florida",
    value: "FL",
  },
  {
    label: "Georgia",
    value: "GA",
  },
  {
    label: "Guam",
    value: "GU",
  },
  {
    label: "Hawaii",
    value: "HI",
  },
  {
    label: "Idaho",
    value: "ID",
  },
  {
    label: "Illinois",
    value: "IL",
  },
  {
    label: "Indiana",
    value: "IN",
  },
  {
    label: "Iowa",
    value: "IA",
  },
  {
    label: "Kansas",
    value: "KS",
  },
  {
    label: "Kentucky",
    value: "KY",
  },
  {
    label: "Louisiana",
    value: "LA",
  },
  {
    label: "Maine",
    value: "ME",
  },
  {
    label: "Marshall Islands",
    value: "MH",
  },
  {
    label: "Maryland",
    value: "MD",
  },
  {
    label: "Massachusetts",
    value: "MA",
  },
  {
    label: "Michigan",
    value: "MI",
  },
  {
    label: "Minnesota",
    value: "MN",
  },
  {
    label: "Mississippi",
    value: "MS",
  },
  {
    label: "Missouri",
    value: "MO",
  },
  {
    label: "Montana",
    value: "MT",
  },
  {
    label: "Nebraska",
    value: "NE",
  },
  {
    label: "Nevada",
    value: "NV",
  },
  {
    label: "New Hampshire",
    value: "NH",
  },
  {
    label: "New Jersey",
    value: "NJ",
  },
  {
    label: "New Mexico",
    value: "NM",
  },
  {
    label: "New York",
    value: "NY",
  },
  {
    label: "North Carolina",
    value: "NC",
  },
  {
    label: "North Dakota",
    value: "ND",
  },
  {
    label: "Northern Mariana Islands",
    value: "MP",
  },
  {
    label: "Ohio",
    value: "OH",
  },
  {
    label: "Oklahoma",
    value: "OK",
  },
  {
    label: "Oregon",
    value: "OR",
  },
  {
    label: "Palau",
    value: "PW",
  },
  {
    label: "Pennsylvania",
    value: "PA",
  },
  {
    label: "Puerto Rico",
    value: "PR",
  },
  {
    label: "Rhode Island",
    value: "RI",
  },
  {
    label: "South Carolina",
    value: "SC",
  },
  {
    label: "South Dakota",
    value: "SD",
  },
  {
    label: "Tennessee",
    value: "TN",
  },
  {
    label: "Texas",
    value: "TX",
  },
  {
    label: "Utah",
    value: "UT",
  },
  {
    label: "Vermont",
    value: "VT",
  },
  {
    label: "Virgin Islands",
    value: "VI",
  },
  {
    label: "Virginia",
    value: "VA",
  },
  {
    label: "Washington",
    value: "WA",
  },
  {
    label: "West Virginia",
    value: "WV",
  },
  {
    label: "Wisconsin",
    value: "WI",
  },
  {
    label: "Wyoming",
    value: "WY",
  },
];

const departments: { value: string; label: string }[] = [
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
  { value: "engineering", label: "Engineering" },
  { value: "humanResources", label: "Human Resources" },
  { value: "legal", label: "Legal" },
];
