import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEmployee = async (id) => {
  try {
    const response = await fetch(`/api/employees/${id}`);
    
    if (!response) {
      throw new Error("Error fetching update ID");
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error fetching update ID: ", error)
  }
  
};
const fetchCompanies = async () => {
  try {
    const res = await fetch("api/company");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [companyList, setCompanyList] = useState([])

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(id)
      .then((employee) => {
        setEmployee(employee);
        setEmployeeLoading(false);
      });

    fetchCompanies()
    .then((list) => {
      setCompanyList(list)
    })
  }, [id]);

  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateEmployee(employee)
      .then(() => {
        setUpdateLoading(false);
        navigate("/");
      });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <EmployeeForm
      employee={employee}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
      companyList={companyList}

      
    />
  );
};

export default EmployeeUpdater;
