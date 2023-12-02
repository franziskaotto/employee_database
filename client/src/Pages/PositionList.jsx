import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import PositionTable from "../Components/PositionTable";

const fetchPositions = () => {
  return fetch(`/api/positions`).then((res) => res.json());
};

const deletePositions = (id) => {
  return fetch(`/api/positions/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const PositionList = () => {
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState(null);

  const onDelete = (id) => {
    deletePositions(id);

    setPositions((positions) => {
      return positions.filter((position) => position._id !== id);
    });
  };

  useEffect(() => {
    fetchPositions().then((positions) => {
      setLoading(false);
      setPositions(positions);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <PositionTable positions={positions} onDelete={onDelete} />
    </>
  );
};

export default PositionList;
