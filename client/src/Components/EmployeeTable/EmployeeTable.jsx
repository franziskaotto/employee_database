import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";
//import FetchLevels from "../FetchLevels";

const serverPath = "http://localhost:3000/api";

const getEmpolyeesLevel = async (searchedLevel, setEmployeeList) => {
  try {
    const response = await fetch(
      `${serverPath}/search?level=${searchedLevel}`
    );
    console.log(response);
    console.log(searchedLevel);
    const data = await response.json();
    console.log(data);

    setEmployeeList(data);
  } catch (err) {
    console.error("Error fetching levels:", err);
  }
};
const getEmpolyeesPosition = async (searchedPosition, setEmployeeList) => {
  try {
    const response = await fetch(
      `${serverPath}/search?position=${searchedPosition}`
    );
    console.log(response); 
    console.log(searchedPosition);
    const data = await response.json();
    console.log(data);

    setEmployeeList(data);
  } catch (err) {
    console.error("Error fetching levels:", err);
  }
};


//refactor: use one route with query, use one onclick handler function

const EmployeeTable = ({ employees, onDelete }) => {

  const [employeeList, setEmployeeList] = useState(employees);
  //const [searchedLevel, setSearchedLevel] = useState('');
  //const [searchedPosition, setSearchedPosition]= useState('');

  
  const handleSearchLevel = (e) => {
    //setSearchedLevel(e.target.value);
    getEmpolyeesLevel(e.target.value, setEmployeeList);
  };
  
  const handleSearchPosition = (e) => {
    //setSearchedPosition(e.target.value);

    getEmpolyeesPosition(e.target.value, setEmployeeList);
  };

  // useEffect(()=> {
  //   getEmpolyeesData();
  // }, [searchedLevel, searchedPosition]);

  
  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <>
            <select>
              <option>Name</option>
              <option>Level</option>
              <option>Position</option>
            </select>
          </>

          <tr>
            <th>Name</th>
            <th>
              Level
              <input
                type="text"
                placeholder="search"
                onChange={handleSearchLevel}
              />
              <button>ABC^</button>
            </th>
            <th>
              Position
              <input
                type="text"
                placeholder="search"
                onChange={handleSearchPosition}
              />
              {/* <button onClick={sortByABC}>ABC^</button> */}
            </th>
            <th>Present?</th>

            <th />
          </tr>
        </thead>

        <tbody>
          <>
            {employeeList?.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.level}</td>
                <td>{employee.position}</td>
                <td>
                  <input type="checkbox" id="option-1" />
                </td>
                <td>
                  <Link to={`/update/${employee._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => onDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;



// const getPositionData = async (searchedPosition, setEmployeeList) => {
//   try {
//     console.log(searchedPosition);
//     const response = await fetch(`${serverPath}/positions/${searchedPosition}`);

//     const data = await response.json();
//     console.log(data);
//     setEmployeeList(data);
//   } catch (error) {
//     console.log("error fetching Position Data", error);
//   }
// };
