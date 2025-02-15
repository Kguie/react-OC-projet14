import { useAtom } from "jotai";

import { employeesAtom } from "../store/employeesAtom";

export default function EmployeesListTable() {
  const [employees] = useAtom(employeesAtom);

  return (
    <div className="flex bg-red-500 flex-1 overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Date of Birth</th>
            <th className="border px-4 py-2">Start Date</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">State</th>
            <th className="border px-4 py-2">Zip code</th>
            <th className="border px-4 py-2">City</th>
            <th className="border px-4 py-2">Street</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{employee.firstName}</td>
              <td className="border px-4 py-2">{employee.lastName}</td>
              <td className="border px-4 py-2">{employee.dateOfBirth}</td>
              <td className="border px-4 py-2">{employee.startDate}</td>
              <td className="border px-4 py-2">{employee.department}</td>
              <td className="border px-4 py-2">{employee.address.state}</td>
              <td className="border px-4 py-2">{employee.address.zipCode}</td>
              <td className="border px-4 py-2">{employee.address.city}</td>
              <td className="border px-4 py-2">{employee.address.street}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
