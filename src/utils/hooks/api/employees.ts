import { useGet, usePost } from ".";
import { generateId } from "../../utils";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { employeesAtom } from "../../../store/employeesAtom";

export type EmployeeDTO = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  department: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
};
export type EmployeeProps = EmployeeDTO & {
  id: string;
};

const url = "/data/employees.json";

export function useGetEmployees() {
  const [, setEmployees] = useAtom(employeesAtom);
  const { data, isLoading, error } = useGet<EmployeeProps[]>(url);
  useEffect(() => {
    if (data) {
      setEmployees(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return { data, isLoading, error };
}

export function useCreateEmployee() {
  const [employees, setEmployees] = useAtom(employeesAtom);
  const { isLoading, error } = usePost<EmployeeDTO, EmployeeProps>(url);
  const [newError, setNewError] = useState<string | null>(null);

  function handleCreateEmployee(
    payload: EmployeeDTO
  ): EmployeeProps | undefined {
    setNewError(null);
    let newEmployee = undefined;

    // Vérification que l'employé n'existe pas déjà
    const isExisting = employees.some(
      ({ firstName, lastName }) =>
        firstName.toLowerCase() === payload.firstName.toLowerCase() &&
        lastName.toLowerCase() === payload.lastName.toLowerCase()
    );

    if (isExisting) {
      setNewError(`An error occurred`);
      return newEmployee;
    }

    // Payload formaté pour y ajouter un id et transformer les dates vu qu'on utilise un json pour simuler un back
    newEmployee = { ...payload, id: generateId() };

    setEmployees([...employees, newEmployee]);

    return newEmployee;
  }
  return { handleCreateEmployee, isLoading, error: newError || error };
}
