import React from 'react'
import CompanyForm from '../Components/CompanyForm/CompanyForm'
import { useNavigate } from 'react-router-dom';



const createNewCompany = async (newCompany) => {
  try {
    const response = await fetch("/api/company", {
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

const CompanyCreator = () => {
  const navigate = useNavigate();

 
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
  )


  
}

export default CompanyCreator