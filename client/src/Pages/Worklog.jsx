import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
  const { id }  = useParams()
  const [worklogData, setWorklogData] = useState([])

  console.log(id)

  useEffect(() => {
    fetchWorklog(id).then((data) => setWorklogData(data))
  }, [id])

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Hour</th>
            <th>label</th>
          </tr>
        </thead>

        <tbody>
          <>
            {worklogData.map((log) => (
              <tr key={log._id}>
                <td>{log.hours}</td>
                <td>{log.label}</td>
               
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </div>
  );
}

export default Worklog