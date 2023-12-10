import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const serverPath = "http://localhost:3000/api/employees";

const fetchOneEmployee = async (id) => {
  try {
    const response = await fetch(`${serverPath}/${id}/notes`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error fetching employee: ", error);
  }
};

const postNewNote = async (id, newNote) => {
  try {
    console.log(newNote)
    const response = await fetch(`${serverPath}/${id}/notes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: newNote }),
    });

    const data = await response.json()
    return data
  } catch (error) {
    console.log("error posting new note", error)
  }
}





const EmployeeNotes = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState([])
  const [noteList, setNoteList] = useState([])
  const [newNote, setNewNote] = useState("")
  
  console.log(employee)
  useEffect(() => {
    fetchOneEmployee(id).then((employee) => {
      setEmployee(employee)
      setNoteList(employee.note);
    });
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    setNewNote("")
    postNewNote(id, newNote)
    setNoteList((prevNoteList) => [...prevNoteList, newNote]);
  }


  return (
    <table className="EmployeeTable">
      <thead>
        <tr>
          <th>
            Name: {employee.name}

            <form onSubmit={handleSave}>
              <div className="control">
                <input
                  value={newNote}
                  type="text"
                  id="input"
                  placeholder="create new note"
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <button type="submit">save Note</button>
              </div>
            </form>
            
          </th>
        </tr>
      </thead>

      <tbody>
        {noteList.map((el, index) => (
          <tr key={index} >
            <td >{el}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default EmployeeNotes;





