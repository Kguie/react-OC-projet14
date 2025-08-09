import { useAtom } from "jotai";
import { useMemo } from "react";
import { format, parse } from "date-fns";
import {
  DataTable,
  DataTableBody,
  DataTablePagination,
  DataTableSearch
} from "@kguie/data-table"

import { employeesAtom } from "../store/employeesAtom";
import { STATES } from "./data/data";

const COLS = [
  { key: "firstName", title: "First Name", sortable: true },
  { key: "lastName", title: "Last Name", sortable: false },
  { key: "dateOfBirth", title: "Date of Birth", sortable: true },
  { key: "startDate", title: "Start Date", sortable: true },
  { key: "department", title: "Department", sortable: true },
  { key: "address.state", title: "State", sortable: true },
  { key: "address.zipCode", title: "Zip code", sortable: true },
  { key: "address.city", title: "City", sortable: true },
  { key: "address.street", title: "Street", sortable: true },
];

export default function EmployeesListTable() {
  const [employees] = useAtom(employeesAtom);

  function handleDateConvert(stringDate: string) {
    const parsed = parse(stringDate, "yyyy-MM-dd", new Date());
    return format(parsed, "dd/MM/yyyy");
  }

  const handleFindStateLabel = (stateCode: string) =>
    STATES.find(({ value }) => value === stateCode)?.label || "";

  const formattedEmployees = useMemo(
    () =>
      employees.map((employee) => {
        return {
          ...employee,
          dateOfBirth: handleDateConvert(employee.dateOfBirth),
          startDate: handleDateConvert(employee.startDate),
          address: {
            ...employee.address,
            state: handleFindStateLabel(employee.address.state),
          },
        };
      }),
    [employees]
  );

  return <DataTable data={formattedEmployees} columns={COLS}  >
    <DataTableSearch iconColor="white" />
    <DataTableBody />
    <DataTablePagination />
  </DataTable>
}
