import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EquipmentForm from "../Components/EquipmentForm";

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

    createEquipment(equipment)
    .then(() => {
      setLoading(false);
      navigate("/equipment");
    });
  };

  return (
    <EquipmentForm
      onCancel={() => navigate("/equipment")}
      loading={loading}
      onSave={handleCreateEquipment}
    />
  );
};

export default EquipmentCreators;
