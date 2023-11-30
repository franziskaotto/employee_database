import React, { useState } from "react";
import { Link } from "react-router-dom";

const EquipmentTable = ( {equipment, onDelete}) => {

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          <>
            {equipment?.map((equipment) => (
              <tr key={equipment._id}>
                <td>{equipment.name}</td>
                <td>{equipment.type}</td>
                <td>{equipment.amount}</td>
                <td>
                  <input type="checkbox" id="option-1" />
                </td>
                <td>
                  <Link to={`/equipment/update/${equipment._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => onDelete(equipment._id)}>
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

export default EquipmentTable;
