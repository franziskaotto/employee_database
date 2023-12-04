import { useEffect, useState } from "react";
import Loading from "../Loading";


const fetchPositions = () => {
  return fetch(`/api/positions`).then((res) => res.json());
};

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [loading, setLoading] = useState(true);
  const [positionsData, setPositionsData] = useState(null);

  useEffect(() => {
    fetchPositions().then((positions) => {
      setLoading(false);
      setPositionsData(positions);
    });
  }, []);


  console.log(positionsData);

  if (loading) {
    return <Loading />;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
      });
    }

    return onSave({
      name,
      level,
      position,
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
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        >
          <option value={""} disabled>
            Select Position
          </option>
          {positionsData.map((pos) => (
            <option key={pos._id} value={pos.name}>
              {pos.name}
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
