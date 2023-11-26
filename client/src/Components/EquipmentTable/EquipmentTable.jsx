import React, { useState } from "react";

const Equipment = () => {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [amount, setAmount] = useState("")

  const handleSubmit = () => {}


  return (
    <div className="EmployeeTable">
      <table>
        {/* <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              //value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Type:
            <input
              type="text"
              //value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </label>
          <label>
            Amount:
            <input
              type="text"
              //value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <button type="submit">Add Equipment</button>
        </form> */}

        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {/* <>
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
          </> */}
        </tbody>
      </table>
    </div>
  );
};

export default Equipment;
