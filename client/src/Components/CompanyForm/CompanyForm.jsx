import { useState } from "react";

const CompanyForm = ({ onSave, onCancel }) => {
  const [newCompany, setNewCompany] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setNewCompany("")

    return onSave({
      name: newCompany
    })
    
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label>New Company Name:</label>
        <input
          value={newCompany}
          onChange={(e) => setNewCompany(e.target.value)}
        ></input>
      </div>
      <div className="buttons">
        <button type="submit">create company</button>
        <button type="submit" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
