import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";

import Home from "../../pages/home/Home";
import EmployeeList from "../../pages/employeeList/EmployeeList";
import Error from "../../pages/Error/Error";
import EmployeesProvider from "../../components/EmployeesProvider";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <EmployeesProvider>
        <Routes />
      </EmployeesProvider>
    </BrowserRouter>
  );
}

const routes = [
  { path: "/", element: <Home /> },
  { path: "/employee-list", element: <EmployeeList /> },
  { path: "*", element: <Error /> },
];

export const Routes = () => (
  <RouterRoutes>
    {routes.map(({ path, element }, index) => (
      <Route key={index} path={path} element={element} />
    ))}
  </RouterRoutes>
);
