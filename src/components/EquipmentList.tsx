import { Equipment } from "../interfaces/equipmentInterface";
import { useState } from "react";
import { updateEquipment } from "../services/apiFacade.ts";
import { toast } from "react-toastify";
import "../styling/equipmentlist.css";
import "react-toastify/dist/ReactToastify.css";

function EquipmentList({ equipment }: { equipment: Equipment[] }) {
  const [editStock, setEditStock] = useState<{ [key: number]: number }>({});

  const handleStockChange = (id: number, stock: number) => {
    setEditStock((prev) => ({ ...prev, [id]: stock }));
  };

  const handleSave = async (id: number) => {
    const equipmentItem = equipment.find((eq) => eq.id === id);
    if (equipmentItem) {
      const newStock =
        editStock[id] !== undefined ? editStock[id] : equipmentItem.stock;
      if (newStock < 0) {
        toast.error("Stock cannot be negative");
        return;
      }
      try {
        const updatedEquipment = { ...equipmentItem, stock: editStock[id] };
        await updateEquipment(id, updatedEquipment);
        toast.success("Stock updated successfully");
      } catch (error) {
        toast.error("Could not update stock, something went wrong.");
        console.error(error);
      }
    }
  };

  return (
    <div className="equipment-page">
      <h2 className="equipment-header">Equipment</h2>
      <table className="equipment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((equipmentItem) => (
            <tr key={equipmentItem.id}>
              <td>{equipmentItem.id}</td>
              <td>{equipmentItem.name}</td>
              <td>
                <input
                  type="number"
                  value={editStock[equipmentItem.id] ?? equipmentItem.stock}
                  onChange={(e) =>
                    handleStockChange(
                      equipmentItem.id,
                      parseInt(e.target.value)
                    )
                  }
                />
              </td>
              <td>
                <button
                  className="save-button"
                  onClick={() => handleSave(equipmentItem.id)}
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EquipmentList;
