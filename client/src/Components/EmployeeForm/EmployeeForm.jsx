import { useEffect, useState } from "react";
import Loading from "../Loading";


const fetchCompanies = async () => {
  try {
    const response = await fetch("http//127.0.0.1:3000/api/companies")
    const data = await response.json()
    return data;
  } catch (error) {
    console.log("error fetching Companies: ", error)
  }
}

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [companiesList, setCompaniesList] = useState([])
  const [company, setCompany] = useState(employee.company?? "")


 const onSubmit = (e) => {
   e.preventDefault();
   const formData = new FormData(e.target);
   const entries = [...formData.entries()];

   const company = entries.reduce((accumulator, entry) => {
     const [key, value] = entry;
     accumulator[key] = value;
     return accumulator;
   }, {});
   return onSave(company);
 };


  useEffect(() => {
    fetchCompanies().then((list) => {
      setCompaniesList(list)
    })
  }, [])

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

  const handleCompanyChange = (e) => {
    const selectedCompanyName = e.target.value;
    const selectedCompanyObj = companiesList.find((entry) => entry.name === selectedCompanyName)

    if (selectedCompanyObj) {
      setCompany(selectedCompanyObj._id);
    } else {
      throw new Error ("failed to find company");
    }

  }

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
        <label htmlFor="control">Previous Company:</label>
        <select
          value={companiesList.find((comp) => comp._id === company)?.name}
          onChange={handleCompanyChange}
        >

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
