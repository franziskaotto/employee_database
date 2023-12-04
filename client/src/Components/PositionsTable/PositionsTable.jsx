import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PositionsTable.css";


const PositionsTable = ({ positions, onDelete }) => {

  console.log(positions)

  
  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>

            <th>Salary</th>
          </tr>
        </thead>

        <tbody>
          <>
            {positions.map((pos) => (
              <tr key={pos._id}>
                <td>{pos.name}</td>
                <td>{pos.salary}</td>
               
                <td>
                
                  <button type="button" onClick={() => onDelete(pos._id)}>
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

export default PositionsTable;



