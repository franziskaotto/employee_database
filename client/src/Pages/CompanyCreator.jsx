import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CompanyForm from "../Components/CompanyForm";

const serverPath = "http://localhost:3000/api"

const createNewCompany = async (newCompany) => {
  console.log(newCompany)
  try {
    const response = await fetch(`http://localhost:3000/api/company`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCompany),
    });
    console.log("patchfetch", newCompany);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error creating new Company: ", error);
  }
};

const CompanyCreator = () => {
  const navigate = useNavigate();

  const handleCreateCompany = async (newCompany) => {
    try {
      await createNewCompany(newCompany)
      navigate("/")
    } catch (error) {
      console.log("Error creating new Company: ", error)
    }
  }

  return (
    <CompanyForm
      onCancel={() => navigate("/")}
      onSave={handleCreateCompany}
    />
  );
}

export default CompanyCreator;



