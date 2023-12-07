import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";

const createEmployee = (employee) => {
  return fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const EmployeeCreator = () => {
  const navigate = useNavigate();

  const handleCreateEmployee = (employee) => {

    createEmployee(employee)
      .then(() => {
        navigate("/");
      })
  };

  return (
    <EmployeeForm
      onCancel={() => navigate("/equipment")}
      // loading={loading}
      onSave={handleCreateEmployee}
    />
  );
};

export default EmployeeCreator;
