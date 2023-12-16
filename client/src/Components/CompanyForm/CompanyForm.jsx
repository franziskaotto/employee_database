import React, { useState } from 'react'

const CompanyForm = ({ onCancel, onSave }) => {
  const [newCompany, setNewCompany] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setNewCompany("");

    return onSave({
      name: newCompany,
    });
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="company">company:</label>
        <input
          value={newCompany}
          onChange={(e) => setNewCompany(e.target.value)}
          name="company"
          id="company"
        />
      </div>
      <div className="button">
        <button type="submit">create Company</button>
        <button type="submit" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
};

export default CompanyForm