import { useState } from "react";


const CompanyForm = ({ onSave, onCancel }) => {
  const [newCompany, setNewCompany] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setNewCompany("");
    
    return onSave({
      name: newCompany
    })
  }

  

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>


      <div className="control">
        <label htmlFor="position">Company:</label>
        <input value={newCompany} onChange={(e) => setNewCompany(e.target.value)} />
      </div>

      <div className="buttons">
        <button type="submit">
          "Create Company"
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
