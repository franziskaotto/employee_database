import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';



const serverPath = "http://localhost:3000/api/employees";

const getWorkingData = async (id) => {
  try {
    console.log(id, "ID HERE")
    const response = await fetch(`${serverPath}/worklog/${id}`);
    const data = await response.json();
    console.log(data, "fetch")
    return data
    
  } catch (error) {
    console.log("error fetching worklog", error)
    
  }
}





const Worklog = () => {
  //URL: '/your-path/:id', where :id is a dynamic parameter, the useParams hook allows you to access the value of id from the URL.
  const { id } = useParams();
  const [worklog, setWorklog] = useState([]);
  console.log(worklog, "data set as worklogState")

  useEffect(() => {
    getWorkingData(id).then((data) => setWorklog(data))
  }, [id])

  return (
    <div>
      <table className="EmployeeTable">
        <thead>
          <tr>
            <th>Workhours</th>
            <th>Label</th>
          </tr>
        </thead>
        <tbody>
          {worklog?.map((work) => (
            <tr key={work._id}>
              <td>{work.hours}</td>
              <td>{work.label}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
}
export default Worklog;
