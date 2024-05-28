import { Maintainable } from "../pages/MaintenancePage";
import { changeMaintenanceStatus } from "../services/apiFacade";
import "../styling/schedule.css"

export default function MaintenanceTable({ maintainables, setMaintainables }: { maintainables: Maintainable[], setMaintainables: (maintainables: Maintainable[]) => void}) {
  async function handleButtonClicked(maintainable: Maintainable) {
    // console.log("Button clicked");
    // console.log(maintainable);
    // console.log(maintainables.findIndex((m) => m === maintainable));
    // console.log("INDEX", index);
    
    // console.log(res);
    
    // console.log(maintainables.length);
    
    const res = await changeMaintenanceStatus(maintainable);
    const index = maintainables.findIndex((m) => m === maintainable);
    const newMaintainables = [...maintainables];
    newMaintainables[index] = res
    // console.log("NEW", newMaintainables.length);
    // console.log("NEW", newMaintainables);
    
    
    setMaintainables(newMaintainables);

  }

  return (
    <>
      {maintainables ? (
        <div
          style={{
            padding: "1vw",
            margin: "1vw",
          }}
        >
          <h1>Maintenance List</h1>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Table / Lane number</th>
                <th>Maintenance</th>
                <th>Change status</th>
              </tr>
            </thead>
            <tbody>
              {maintainables.map((maintainable) => (
                <tr key={maintainable.activityType + (maintainable.laneNumber ?? maintainable.tableNumber)}>
                  <td>{maintainable.activityType.slice(0,1) + maintainable.activityType.slice(1).toLocaleLowerCase()}</td>
                  <td>{maintainable.laneNumber ?? maintainable.tableNumber}</td>
                  <td>{maintainable.maintenance ? "Under maintenance" : "All ok"}</td>
                  <td>
                    <button onClick={() => handleButtonClicked(maintainable)}>Change status</button>
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