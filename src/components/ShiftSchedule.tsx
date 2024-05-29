import { useEffect, useState } from "react";
import { Shift, DailyShifts, Workers } from "../interfaces/shiftInterface.ts";
import { getShifts } from "../services/apiFacade";
import "../styling/schedule.css";

export default function ShiftSchedule() {
  const [shift, setShift] = useState<Shift[]>([]);

  useEffect(() => {
    const fetchShifts = async () => {
      const shiftList = await getShifts();
      console.log(shiftList);

      setShift(shiftList);
    };

    fetchShifts();
  }, []);

  return (
    <div className="schedule">
      <table>
        <thead>
          <tr>
            <th>Shift</th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ color: "black" }}>
          {hours.map((shift, shiftIndex) => (
            <tr key={shift}>
              <td>{shift}</td>
              {days.map((day) => (
                <td key={day + shift}>
                  {shiftIndex === 0
                    ? workers[day].morning.workers.map((worker, index) => (
                        <div key={index} className="worker-select">
                          <select value={worker} onChange={(e) => handleWorkerChange(day, "morning", index, e.target.value)}>
                            <option value="">None</option>
                            {allStaffMembers.map((staffMember) => (
                              <option key={staffMember} value={staffMember}>
                                {staffMember}
                              </option>
                            ))}
                          </select>
                          <button className="remove-worker-button" onClick={() => removeWorker(day, "morning", index)}>
                            -
                          </button>
                        </div>
                      ))
                    : workers[day].evening.workers.map((worker, index) => (
                        <div key={index} className="worker-select">
                          <select value={worker} onChange={(e) => handleWorkerChange(day, "evening", index, e.target.value)}>
                            <option value="">None</option>
                            {allStaffMembers.map((staffMember) => (
                              <option key={staffMember} value={staffMember}>
                                {staffMember}
                              </option>
                            ))}
                          </select>
                          <button className="remove-worker-button" onClick={() => removeWorker(day, "evening", index)}>
                            -
                          </button>
                        </div>
                      ))}
                  <button className="add-worker-button" onClick={() => addWorker(day, shiftIndex === 0 ? "morning" : "evening")}>
                    Add Worker
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
