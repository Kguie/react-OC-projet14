import { useGetEmployees } from "../utils/hooks/api/employees";

type EmployeeProviderProps = {
  children: React.ReactNode;
};

export default function EmployeesProvider({
  children,
}: EmployeeProviderProps): React.ReactElement {
  useGetEmployees();
  return <>{children}</>;
}
