import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};



const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { 
    method: "DELETE" })
    .then((res) =>
    res.json()
  );
};



const serverPath = "http://localhost:3000/api";

const getEmpolyeesLeveluPosition = async (searchedLevel, searchedPosition, setEmployees) => {
  try {
    const response = await fetch(`${serverPath}/employees/search?level=${searchedLevel}&position=${searchedPosition}`);
    console.log(response);
    console.log(searchedLevel);
    const data = await response.json();
    console.log(data);

    setEmployees(data);
  } catch (err) {
    console.error("Error fetching levels:", err);
  }
};




const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [level, setLevel] = useState("")
  const [position, setPosition]  = useState("");


  

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
  }, []);

 console.log("inside EmployeeList")


  const searchEmployeeByLevel = (searchInput) =>{
    setLevel(searchInput)
    getEmpolyeesLeveluPosition(searchInput, position, setEmployees)
  }

  const searchEmployeeByPosition = (searchInput) => {
    setPosition(searchInput)
    getEmpolyeesLeveluPosition(level, searchInput, setEmployees);
  }



  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <EmployeeTable employees={employees} onDelete={handleDelete} setEmployees={setEmployees} searchEmployeeByLevel={searchEmployeeByLevel} searchEmployeeByPosition={searchEmployeeByPosition} />;
    </>

  )
};

export default EmployeeList;
