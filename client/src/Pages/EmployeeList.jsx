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



const fetchFilteredEmployees = async (searchInput, sortOrder, setEmployees) => {
  try {
    const params = new URLSearchParams();
    params.append("level", searchInput);
    params.append("sortOrder", sortOrder);

    const response = await fetch(`${serverPath}/level?${params.toString()}`);
    const data = await response.json() 
    setEmployees(data)

    } catch (error) {
    console.log(error)
  }

};



const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [level, setLevel] = useState("");
  const [sorted, setSorted] = useState("")


  

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



  const searchEmployeeByLevel = async (searchInput) =>{
    setLevel(searchInput)
    await fetchFilteredEmployees(searchInput, sorted, setEmployees)
  }

  const handleSortByABC = async (sortedValue) => {
    const sortOrder = sortedValue
    await fetchFilteredEmployees(level, sortOrder, setEmployees);
    setSorted(sortedValue)

  }


  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <EmployeeTable 
      employees={employees} 
      onDelete={handleDelete} 
      setEmployees={setEmployees} 
      searchEmployeeByLevel={searchEmployeeByLevel}
      handleSortByABC={handleSortByABC}/>;
    </>

  )
};

export default EmployeeList;
