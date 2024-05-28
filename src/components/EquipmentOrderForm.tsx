import React, { useState, useEffect } from "react";
import "../styling/equipmentorderform.css";
import { EquipmentFormData } from "../interfaces/equipmentInterface";
import { getEquipment } from "../services/apiFacade.ts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EquipmentOrderForm({
  setFormData,
  formData,
  defaultFormObj,
}: {
  setFormData: React.Dispatch<React.SetStateAction<EquipmentFormData>>;
  formData: EquipmentFormData;
  defaultFormObj: EquipmentFormData;
}) {
  const [equipmentOptions, setEquipmentOptions] = useState<EquipmentFormData[]>(
    []
  );

  useEffect(() => {
    const fetchEquipmentOptions = async () => {
      const equipmentList = await getEquipment();
      setEquipmentOptions(equipmentList);
    };
    fetchEquipmentOptions();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order confirmed");
    setFormData(defaultFormObj);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="equipment-form-page">
      <ToastContainer />
      <h2 className="equipment-header">Order Equipment</h2>
      <div className="equipment-form-container">
        <form className="equipment-form" onSubmit={handleFormSubmit}>
          <label>
            Name:
            <select
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            >
              <option value="">Select equipment</option>
              {equipmentOptions.map((equipment) => (
                <option key={equipment.id} value={equipment.name}>
                  {equipment.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Confirm Order</button>
        </form>
      </div>
    </div>
  );
}
