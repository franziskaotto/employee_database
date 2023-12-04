
import { Link } from "react-router-dom";
//import "./"; CSS and need to make connection

const PositionTable = ({ positions, onDelete }) => (
  <div className="PositionTablee">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((position) => (
          <tr key={position._id}>
            <td>{position.name}</td>
            <td>$ {position.salary}</td>
            <td>
              <button type="button" onClick={() => onDelete(position._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PositionTable;
