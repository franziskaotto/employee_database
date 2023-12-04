import React from 'react'

import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import PositionsTable from "../Components/PositionsTable";

const fetchPositions = () => {
  return fetch("/api/positions").then((res) => res.json());
};

const deletePositions = (id) => {
  return fetch(`/api/positions/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};




const PositionsList = () => {
  const [loading, setLoading] = useState(true);
  const [positionsData, setPositionsData] = useState(null)

  const handleDelete = (id) => {
    deletePositions(id);

    setPositionsData((positions) => {
      return positionsData.filter((position) => position._id !== id);
    });
  };

  useEffect(() => {
    fetchPositions().then((positions) => {
      setLoading(false);
      setPositionsData(positions);
    });
  }, []);

  console.log("inside PositrionsList");
  console.log(positionsData)

  

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <PositionsTable
        positions={positionsData}
        onDelete={handleDelete}
      />
    </>
  );
};

export default PositionsList;
