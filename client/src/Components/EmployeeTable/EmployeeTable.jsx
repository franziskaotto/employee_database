import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";


const EmployeeTable = ({ employees, onDelete, searchByLevel, handleOrderClick  }) => {

  console.log(employees)
  
  const [levelInput, setlevelInput] = useState("");
  
  const handlSearchLevel = (e) => {
    setlevelInput(e.target.value)
    searchByLevel(e.target.value)
  }
 

  
  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>

            <th>
              Level
              <form type="submit">
                <input
                  type="text"
                  placeholder="search"
                  value={levelInput}
                  onChange={handlSearchLevel}
                />
              </form>
              <Link to={`/levelfilter/:sorted`}>
                <button type="button">ABC^</button>
              </Link>
            </th>
            <th>Position</th>
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



