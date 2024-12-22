import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../../pages/home/Home";
import EmployeeList from "../../pages/employeeList/EmployeeList";
import Error from "../../pages/Error/Error";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

const routes = [
  { path: "/", element: <Home /> },
  { path: "/employee-list", element: <EmployeeList /> },
  { path: "*", element: <Error /> },
];
