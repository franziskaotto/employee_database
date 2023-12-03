import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";


import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import Superheroes from "./Pages/Superheroes";
import EquipmentCreator from "./Pages/EquipmentCreator";
import EquipmentList from "./Pages/EquipmentList";
import EquipmentUpdater from "./Pages/EquipmentUpdater";
import EmployeeSortABC from "./Pages/EmployeeSortABC";
import Worklog from "./Pages/Worklog";


import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/hello",
        element: <h1>This is the Hello - Route</h1>,
      },
      {
        path: "/superheroes",
        element: <Superheroes />,
      },
      {
        path: "/equipment",
        element: <EquipmentList />,
      },
      {
        path: "/createEquipment",
        element: <EquipmentCreator />,
      },
      {
        path: "/equipment/update/:id",
        element: <EquipmentUpdater />,
      },
      {
        path: "/employees/sort/:sorted",
        element: <EmployeeSortABC />
      },
      {
        path: "/employees/worklog/:id",
        element: <Worklog />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
