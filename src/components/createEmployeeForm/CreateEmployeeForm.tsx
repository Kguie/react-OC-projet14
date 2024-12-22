import { useForm } from "react-hook-form";

import Separator from "../Separator";
import CreateEmployeeFormInput from "./CreateEmployeeFormInput";

export type CreateEmployeeFormData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
};

export default function CreateEmployeeForm(): React.ReactElement {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateEmployeeFormData>();

  const onSubmit = (data: CreateEmployeeFormData) => {
    console.log("Employee Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="create-employee"
      className="space-y-4 flex flex-col gap-6">
      <fieldset className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <CreateEmployeeFormInput
            name="firstName"
            label="First Name"
            control={control}
            errors={errors}
          />
          <CreateEmployeeFormInput
            name="lastName"
            label="Last Name"
            control={control}
            errors={errors}
          />
        </div>

        <div className="flex flex-col gap-4">
          <CreateEmployeeFormInput
            name="dateOfBirth"
            label="Date Of Birth"
            control={control}
            errors={errors}
          />
          <CreateEmployeeFormInput
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
          <CreateEmployeeFormInput
            name="street"
            label="Street"
            control={control}
            errors={errors}
          />
          <CreateEmployeeFormInput
            name="city"
            label="City"
            control={control}
            errors={errors}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <CreateEmployeeFormInput
            name="state"
            label="State"
            control={control}
            errors={errors}
            options={states}
          />
          <CreateEmployeeFormInput
            name="zipCode"
            label="Zip Code"
            control={control}
            errors={errors}
          />
        </div>
      </fieldset>
      <Separator />

      <fieldset className="space-y-4 ">
        <CreateEmployeeFormInput
          name="department"
          label="Department"
          control={control}
          errors={errors}
          options={departments}
        />
      </fieldset>
      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Save
      </button>
    </form>
  );
}

const states: { value: string; label: string }[] = [
  { value: "", label: "Select a state" },
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
  { value: "", label: "Select a department" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
  { value: "engineering", label: "Engineering" },
  { value: "humanResources", label: "Human Resources" },
  { value: "legal", label: "Legal" },
];
