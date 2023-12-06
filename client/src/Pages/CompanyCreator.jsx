import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CompanyForm from "../Components/CompanyForm";

const createNewCompany = async(company) => {
  try {
    const response = await fetch("/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(company),
    });
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error creating new Company: ", error)
  }
};

const CompanyCreator = () => {
  const navigate = useNavigate();

  const handleCreateCompany = async (company) => {
    try {
      await createNewCompany(company)
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



