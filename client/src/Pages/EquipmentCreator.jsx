import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EquipmentCreator from "../Components/EquipmentForm/EquipmentForm";

const createEquipment = (equipment) => {
  return fetch("/api/equipment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

const EquipmentCreators = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateEquipment = (equipment) => {
    setLoading(true);

    createEquipment(equipment).then(() => {
      setLoading(false);
      navigate("/");
    });
  };


  //TODO: hier die dinge übergeben
  return (
    <EquipmentCreator
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateEquipment}
    />
  );
};

export default EquipmentCreators;
