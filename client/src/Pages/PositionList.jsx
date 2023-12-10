import React from 'react'
import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import PositionsTable from '../Components/PositionsTable';


const fetchPositionsData = async () => {
  return await fetch("/api/positions").then((res) => res.json());
};



const PositionList = () => {
  const [loading, setLoading] = useState(true);
  const [positionsData, setPositionsData] = useState(null)
  
  useEffect(() => {
    fetchPositionsData()
      .then((positions) => {
        setLoading(false);
        setPositionsData(positions)
      })
  }, [])

  console.log(positionsData)

  if (loading) {
    return <Loading />;
  }
  
  return (
    <PositionsTable positions={positionsData}/>
  )
}

export default PositionList;
