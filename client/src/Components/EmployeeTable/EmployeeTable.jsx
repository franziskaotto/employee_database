import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const serverPath = "http://localhost:3000/api/levels";

const getLevelData = async (searchedLevel, setLevelData) => {
  try {
    const response = await fetch(`${serverPath}/${searchedLevel}`);
    console.log(response);

    const data = await response.json();
    console.log("GET DATA");
    console.log(data);

    setLevelData(data);
  } catch (err) {
    console.error("Error fetching levels:", err);
  }
};

const EmployeeTable = ({ employees, onDelete }) => {
  const [levelData, setLevelData] = useState();

  const handleSearchLevel = (e) => {
    e.preventDefault();

    getLevelData(e.target.value, setLevelData);
  };

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>
              Level
              <input
                type="text"
                placeholder="search"
                onChange={handleSearchLevel}

                //onChange={(e) => getLevlData((e.target.value), setLevelData)}
              />
            </th>
            <th>
              Position
              <input
                placeholder="search"
                // onChange={searchPosition}
                type="text"
              />
            </th>
            <th />
          </tr>
        </thead>

        <tbody>
          <>
            {employees.map((employee) => (
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
