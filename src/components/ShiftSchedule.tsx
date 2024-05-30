import { useEffect, useState } from "react";
import { Shift, DailyShifts, Workers, Staff, DayOfWeek } from "../interfaces/shiftInterface.ts";
import { getShifts } from "../services/apiFacade";
import "../styling/schedule.css";

export default function ShiftSchedule() {
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    const fetchShifts = async () => {
      const shiftList = await getShifts();
      console.log(shiftList);

      setShifts(shiftList);
    };

    fetchShifts();
  }, []);

  function createDaysHeader() {
    return Object.values(DayOfWeek).map((day) => {
      return <th key={day}>{day}</th>;
    });
  }

  function createEarlyShifts() {
    const s = shifts.filter((shift) => shift.shiftStart == "10:00:00");

    s.map((shift) => generateOptions(shift));
    console.log(s);
    return s;
  }

  function createLateShifts() {
    const s = shifts.filter((shift) => shift.shiftStart == "17:00:00");
    console.log(s);
    return s;
  }

  function generateOptions(shift: Shift) {
    const g = shift.staff.map((staff) => (
      <select>
        <option value={staff.name}>{staff.name}</option>
      </select>
    ));
    console.log(g);
    return g;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Shift</th>
            {createDaysHeader()}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10:00 - 17:00</td>
            {createEarlyShifts()}
          </tr>
          <tr>
            <td>17:00 - 23:00</td>
            {createLateShifts()}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
