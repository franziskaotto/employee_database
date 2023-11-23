import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";


const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const Superheroes = () => {
  const [loading, setLoading] = useState(true);
  const [heroes, setHeroes] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setHeroes((data) => {
      return data.filter((data) => data._id !== id);
    });
  };

  useEffect(() => {
    fetch("api/employees/superheroes")
    .then((res) => res.json())
    .then((data) => {
      setLoading(false)
      setHeroes(data)
    })
  }, [])

   if (loading) {
     return <Loading />;
   }



   return <EmployeeTable employees={heroes} onDelete={handleDelete} />;

}

                                                                                                                                                                                                                       

export default Superheroes;
