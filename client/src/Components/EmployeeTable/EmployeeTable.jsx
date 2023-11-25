import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";
//import FetchLevels from "../FetchLevels";

const serverPath = "http://localhost:3000/api";

const getLevelData = async (searchedLevel, setEmployeeList) => {
  try {
    const response = await fetch(`${serverPath}/levels/${searchedLevel}`);
    console.log(searchedLevel);
    const data = await response.json();
    console.log(data);

    setEmployeeList(data);
  } catch (err) {
    console.error("Error fetching levels:", err);
  }
};

const getPositionData = async (searchedPosition, setEmployeeList) => {
  try {
    console.log(searchedPosition);
    const response = await fetch(`${serverPath}/positions/${searchedPosition}`);

    const data = await response.json();
    console.log(data);
    setEmployeeList(data);
  } catch (error) {
    console.log("error fetching Position Data", error);
  }
};

//refactor: use one route with query, use one onclick handler function

const EmployeeTable = ({ employees, onDelete }) => {
  const [toggle, setToggle] = useState(false);

  const [employeeList, setEmployeeList] = useState(employees);
  const handleSearchLevel = (e) => {
    getLevelData(e.target.value, setEmployeeList);
  };

  const handleSearchPostion = (e) => {
    console.log(e);

    getPositionData(e.target.value, setEmployeeList);
  };

  const sortByABC = () => {

  }

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <div>
            <select>
              <option>Name</option>
              <option>Level</option>
              <option>Position</option>
            </select>
          </div>
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
                onChange={handleSearchPostion}
              />
              <button onClick={sortByABC}>ABC^</button>
            </th>
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
