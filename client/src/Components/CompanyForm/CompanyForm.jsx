import { useState } from "react";

const CompanyForm = ({ onSave, onCancel }) => {
  const [newCompany, setNewCompany] = useState("");

  const onSubmit = (e) => {
    e.prevent.default();

    return onSave({
      name: newCompany,
    });
  };
  console.log(newCompany);

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
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
