import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const serverPath = "http://localhost:3000/api/employees";

const fetchWorklog = async (id) => {
  try {
    console.log(id, "ID HERE");
    const response = await fetch(`${serverPath}/worklog/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error fetching worklog: ", error);
  }
};


const Worklog = () => {
  
  const { id } = useParams();
  const [worklogData, setWorklogData] = useState([])

  useEffect(() => {
    fetchWorklog(id).then((data) => setWorklogData(data))
  }, [id])

  return (
    <table>
      <thead>
        <tr>
          <th>Hour</th>
          <th>Label</th>
        </tr>
      </thead>
      <tbody>
        {worklogData.map((entry) => (
          <tr key={entry._id}>

            <td>{entry.hours}</td>
            <td>{entry.label}</td>
          </tr>
        ))}
        
      </tbody>
    </table>
  );
}
export default Worklog;