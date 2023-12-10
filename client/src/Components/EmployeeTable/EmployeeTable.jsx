import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";


const EmployeeTable = ({ employees, onDelete, searchEmployeeByLevel, searchEmployeeByPosition }) => {

  console.log(employees)
  console.log(searchEmployeeByLevel, "byLEVEL")
  console.log(searchEmployeeByPosition, "ByPostion")

  const [searchedLevel, setSearchedLevel] = useState('');
  const [searchedPosition, setSearchedPosition]= useState('');

  
  const handleSearchLevel = (e) => {
    setSearchedLevel(e.target.value);
    searchEmployeeByLevel(e.target.value);
  };
  
  const handleSearchPosition = (e) => {
    setSearchedPosition(e.target.value);

    searchEmployeeByPosition(e.target.value);
  };

  
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
                  onChange={handleSearchLevel}
                />
              </form>
              <Link to={`/employees/sort/level`}>
                <button type="button" >ABC^</button>
              </Link>
            </th>
            <th>
              Position
              <input
                type="text"
                placeholder="search"
                onChange={handleSearchPosition}
              />
              <Link to={"/employees/sort/position"}>
                <button type="button">ABC^</button>
              </Link>
            </th>
            <th>Present</th>

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
                  <input type="checkbox" id="option-1" />
                </td>
                <td>
                  <Link to={`/${employee._id}`}>
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



