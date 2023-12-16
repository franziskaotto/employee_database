import React from 'react'
import CompanyForm from '../Components/CompanyForm';
import { useNavigate } from "react-router-dom";

const CompanyCreator = () => {
  const navigate = useNavigate();

  const createNewCompany = async (newCompany) => {
    console.log(newCompany);
    try {
      const response = await fetch("http://localhost:3000/api/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCompany),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateCompany = async (newCompany) => {
    try {
      await createNewCompany(newCompany)
      navigate("/")
    } catch (error) {
      console.log(error)
    }

  }





  return (
    <CompanyForm
      onCancel={() => navigate("/")}
      onSave={handleCreateCompany}
    />
  );
}

export default CompanyCreator