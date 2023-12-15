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
// const getEmpolyeesLeveluPosition = async (searchedLevel, searchedPosition, setEmployees) => {
//   try {
//     const response = await fetch(`${serverPath}/employees/search?level=${searchedLevel}&position=${searchedPosition}`);
//     console.log(response);
//     console.log(searchedLevel);
//     const data = await response.json();
//     console.log(data);

//     setEmployees(data);
//   } catch (err) {
//     console.error("Error fetching levels:", err);
//   }
// };




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
    //getEmpolyeesLeveluPosition(searchInput, setEmployees)
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
