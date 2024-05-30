import React, { useState } from "react";
import { changeMaintenanceStatus } from "../services/apiFacade";
import "../styling/maintenancelist.css";
import { Maintainable } from "../interfaces/equipmentInterface";

export default function MaintenanceTable({
  maintainables,
  setMaintainables,
}: {
  maintainables: Maintainable[];
  setMaintainables: (maintainables: Maintainable[]) => void;
}) {
  const [activityFilter, setActivityFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  async function handleButtonClicked(maintainable: Maintainable) {
    const res = await changeMaintenanceStatus(maintainable);
    const index = maintainables.findIndex((m) => m === maintainable);
    const newMaintainables = [...maintainables];
    newMaintainables[index] = res;
    setMaintainables(newMaintainables);
  }

  const handleActivityFilterChange = (activityType: string) => {
    setActivityFilter(activityType);
  };

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatusFilter(e.target.value);
  };

  const filteredMaintainables = maintainables.filter((m) => {
    const activityMatch =
      activityFilter === "ALL" || m.activityType === activityFilter;
    const statusMatch =
      statusFilter === "ALL" ||
      (statusFilter === "UNDER_MAINTENANCE" && m.maintenance) ||
      (statusFilter === "AVAILABLE" && !m.maintenance);
    return activityMatch && statusMatch;
  });

  return (
    <>
      {maintainables ? (
        <div className="maintenance-page">
          <h1 className="maintenance-header">Maintenance List</h1>
          <div className="maintenance-filters">
            <button onClick={() => handleActivityFilterChange("ALL")}>
              All
            </button>
            <button onClick={() => handleActivityFilterChange("BOWLING")}>
              Bowling
            </button>
            <button onClick={() => handleActivityFilterChange("CHILDBOWLING")}>
              Child bowling
            </button>
            <button onClick={() => handleActivityFilterChange("AIRHOCKEY")}>
              Air Hockey
            </button>
            <button onClick={() => handleActivityFilterChange("DINING")}>
              Dining
            </button>
            <label htmlFor="statusFilter">Filter by Status:</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="ALL">Show All</option>
              <option value="UNDER_MAINTENANCE">Under Maintenance</option>
              <option value="AVAILABLE">Available</option>
            </select>
          </div>
          <table className="maintenance-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Table / Lane number</th>
                <th>Maintenance</th>
                <th>Change status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMaintainables.map((maintainable) => (
                <tr
                  key={
                    maintainable.activityType +
                    (maintainable.laneNumber ?? maintainable.tableNumber)
                  }
                >
                  <td>
                    {maintainable.activityType.charAt(0) +
                      maintainable.activityType.slice(1).toLowerCase()}
                  </td>
                  <td>{maintainable.laneNumber ?? maintainable.tableNumber}</td>
                  <td>
                    {maintainable.maintenance ? "Under maintenance" : "All ok"}
                  </td>
                  <td>
                    <button
                      className="save-button"
                      onClick={() => handleButtonClicked(maintainable)}
                    >
                      Change status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
