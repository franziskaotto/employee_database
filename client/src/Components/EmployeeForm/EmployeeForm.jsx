import { useState } from "react";
import Loading from "../Loading";


const EmployeeForm = ({ onSave, disabled, employee, onCancel, companyList }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [company, setCompany] = useState(employee?.company ?? "");



  

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        company,
      });
    }

    return onSave({
      name,
      level,
      position,
      company,
    });
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        />
      </div>
      <div className="control">
        <label htmlFor="company">company:</label>
        <select 
          value={company}
          onChange={(e) => setCompany(e.target.value)} 
        
        >

          {companyList.map((comp) => (
            <option key={comp._id} value={comp.name}>
              {comp.name}
            </option>
          ))}
        </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
