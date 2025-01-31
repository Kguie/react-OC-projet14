import { formatDate } from "date-fns";
import { useGet, usePost } from ".";
import { generateId } from "../../utils";

type EmployeeDTO = {
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
type EmployeeProps = EmployeeDTO & {
  id: string;
};

export function useGetEmployees() {
  return useGet<EmployeeProps[]>("http://localhost:5173/employees");
}

export function useCreateEmployee() {
  const { postData, isLoading, error } = usePost<EmployeeDTO, EmployeeProps>(
    "http://localhost:5173/employees"
  );
  // const dispatch = useAppDispatch();

  async function handleCreateEmployee(
    payload: EmployeeDTO
  ): Promise<EmployeeProps | undefined> {
    const {
      firstName: payloadFirstName,
      lastName: payloadLastName,
      dateOfBirth,
      startDate,
    } = payload;
    //Vérification que l'employé n'est pas déjà présent dans la base avec ses noms et prénoms
    const employees: EmployeeProps[] = [];
    const isExisting: boolean = employees.some(
      ({ firstName, lastName }) =>
        firstName.toLowerCase() === payloadFirstName.toLowerCase().trim() &&
        lastName.toLowerCase() === payloadLastName.toLowerCase().trim()
    );
    if (isExisting) throw new Error(`An error occurred`);

    // Payload formaté pour y ajouter un id et transformer les dates vu qu'on utilise un json pour simuler un back
    const formattedPayload: EmployeeProps = {
      ...payload,
      id: generateId(),
      startDate: formatDate(startDate, "yyyy,MM,dd"),
      dateOfBirth: formatDate(dateOfBirth, "yyyy,MM,dd"),
    };
    const res = await postData(formattedPayload);
    if (res) {
      return res;
    }
    return;
  }
  return { handleCreateEmployee, isLoading, error };
}
