import { useEffect, useState } from "react";
import Loading from "../Loading";


const fetchPositions = async () => {
  console.log("here");
  try {
    const response = await fetch(`/api/positions/`);
    if (!response) {
      throw new Error("Error fetching update ID");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching update ID: ", error);
  }
};

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");

  const [positionsData, setPositionsData] = useState([]);

  useEffect(() => {
    fetchPositions().then((positions) => {
      setPositionsData(positions);
    });
  }, []);                                                                                                                                 
  

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
          {positionsData.map((pos) => 
            <option key={pos._id} value={pos.name}>
              {pos.name}
            </option>
          
          )}
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
