import React, { useEffect, useState } from "react";

const fetchPositions = async () => {
  console.log("here");
  try {
    const response = await fetch(`/api/positions/`);
    console.log(response);
    if (!response) {
      throw new Error("Error fetching update ID");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching update ID: ", error);
  }
};

const PositonList = () => {
  const [positionsData, setPositionsData] = useState([]);

  useEffect(() => {
    fetchPositions().then((positions) => {
      setPositionsData(positions);
      console.log(positions);
    });
  }, []);

  console.log(positionsData);

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
            {positionsData.map((pos) => (
              <tr key={pos._id}>
                <td>{pos.name}</td>
                <td>{pos.salary}</td>
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </div>
  );
};

export default PositonList;
