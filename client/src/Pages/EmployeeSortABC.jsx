import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EmployeeTable from "../Components/EmployeeTable";

const EmployeeSortABC = () => {
  const [sortedEmployees, setSortedEmployees] = useState([]);
  const { sorted } = useParams()

  
  useEffect(() => {
    const fetchSortedEmployees = async () => {
      try {
        const response = await fetch(`/api/employees/sort/${sorted}`);
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        const data = await response.json();
        setSortedEmployees(data);
      } catch (error) {
        console.error("Error fetching sorted employees:", error);
      }
    };

    fetchSortedEmployees();
  }, [sorted]);


  return <EmployeeTable employees={sortedEmployees} />;
};

export default EmployeeSortABC;