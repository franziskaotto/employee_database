import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = async () => {
  try {
    const response = await fetch("/api/employees")
    const data = await response.json()
    return data
    
  } catch (error) {
    console.log("error fetchEmployees", error)
  }
};



const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { 
    method: "DELETE" })
    .then((res) =>
    res.json()
  );
};

//nicht in der levelDB sortieren sondern Employee nach nummer

//alle alten searches auskommentieren
//ich suche im levelsmodel nach einem dokument dass den namen vom frontend 

//ich schick das ganze object level mit name property und cvalue property  e.target.value muss dann den namen der level propery
//ich schick das ganze levelobject zum backend


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

  const [level4, setLevel4] = useState("");
  const [order, setOrder] = useState("desc");
  

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  // useEffect(() => {
  //   fetchEmployees()
  //     .then((employees) => {
  //       setLoading(false);
  //       setEmployees(employees);
  //     })
  // }, []);

  //i need 2 fetches 1x für die unsorted Employees? 1x für die filterdEmployees mit levels

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
      <EmployeeTable 
      employees={employees} 
      onDelete={handleDelete} 
      setEmployees={setEmployees} 
      searchEmployeeByLevel={searchEmployeeByLevel} searchEmployeeByPosition={searchEmployeeByPosition} />;
    </>

  )
};

export default EmployeeList;
