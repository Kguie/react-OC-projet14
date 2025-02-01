import { atom } from "jotai";
import { EmployeeProps } from "../utils/hooks/api/employees";

// Atom contenant la liste des employés
export const employeesAtom = atom<EmployeeProps[]>([]);
