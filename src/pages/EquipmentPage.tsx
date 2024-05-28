import { useState, useEffect } from "react";
import EquipmentOrderForm from "../components/EquipmentOrderForm";
import EquipmentList from "../components/EquipmentList";
import { Equipment, EquipmentFormData } from "../interfaces/equipmentInterface";
import { getEquipment } from "../services/apiFacade";

export default function EquipmentPage() {
  const defaultFormObj: EquipmentFormData = { id: 0, name: "", stock: 0 };
  const [formData, setFormData] = useState<EquipmentFormData>(defaultFormObj);
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      const equipmentList = await getEquipment();
      setEquipment(equipmentList);
    };
    fetchEquipment();
  }, []);

  return (
    <div
      style={{ display: "flex", margin: "1rem", padding: "1vw", gap: "2vw" }}
    >
      <div>
        <EquipmentOrderForm
          setFormData={setFormData}
          formData={formData}
          defaultFormObj={defaultFormObj}
        />
      </div>
      <div>
        <EquipmentList equipment={equipment} />
      </div>
    </div>
  );
}
