import React, { useState } from "react";

const PositionsTable = ( {positions}) => {

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          <>
            {positions?.map((pos) => (
              <tr key={pos._id}>
                <td>{pos.name}</td>
                <td>$ {pos.salary}</td>
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </div>
  );
};

export default PositionsTable;
