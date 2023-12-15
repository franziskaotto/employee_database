import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";


const EmployeeTable = ({
  employees,
  onDelete,
  searchEmployeeByLevel,
  handleSortByABC,
}) => {
  console.log(employees);
  console.log(searchEmployeeByLevel, "byLEVEL");

  const [searchedLevel, setSearchedLevel] = useState("");

  const [sort, setSort] = useState("desc");

  const handleSearchLevel = (e) => {
    setSearchedLevel(e.target.value);
    searchEmployeeByLevel(e.target.value);
  };

  const handleClick = () => {
    console.log("handle click");
    const newSortOrder = sort === "asc" ? "desc" : "asc";
    handleSortByABC(newSortOrder);
    setSort(newSortOrder);
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
              <button type="button" onClick={handleClick}>
                ABC^
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          <>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.level.name}</td>
                <td>{employee.position}</td>

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



