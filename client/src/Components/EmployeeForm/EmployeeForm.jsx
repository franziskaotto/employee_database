import { useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [hours, setHours] = useState(0);
  const [label, setLabel] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        ...{worklog: [...employee.worklog, {hours: hours, label: label}]},
      });
    }

    return onSave({
      name,
      level,
      position,
      ...{ worklog: [...employee.worklog, { hours: hours, label: label }] },
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
        <label htmlFor="hours">Working Hours</label>
        <input
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          type="number"
          name="hours"
        ></input>
      </div>

      <div className="control">
        <label htmlFor="label">Working label:</label>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          name="label"
          id="label"
        ></input>
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
