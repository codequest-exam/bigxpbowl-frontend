import { useEffect, useState } from "react";
import { Shift, DailyShifts, Workers, Staff, DayOfWeek } from "../interfaces/shiftInterface.ts";
import { getShifts, getStaff } from "../services/apiFacade";
import "../styling/schedule.css";

export interface Staff {
  id: number;
  name: string;
  role: "MANAGER" | "EMPLOYEE" | "OPERATOR";

}

export default function ShiftSchedule() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);

  useEffect(() => {
    const fetchShifts = async () => {
      const shiftList = await getShifts();
      console.log(shiftList);

      setShifts(shiftList);
    };

    fetchShifts();
  }, []);

  useEffect(() => { 
    async function fetchStaff() {
      const employeesList = await getStaff();
      console.log(employeesList);

      setStaff(employeesList);
    }
    fetchStaff()
  }, []);

  function createDaysHeader() {
    return Object.values(DayOfWeek).map((day) => {
      return <th key={day}>{day}</th>;
    });
  }

  // function createEarlyShifts() {
  //   const s = shifts.filter((shift) => shift.shiftStart == "10:00:00");

  //   const optionedShifts = s.map((shift) => generateOptions(shift));
  //   // console.log(optionedShifts);
  //   return optionedShifts
  // }

  function generateShifts(startTime: string) {
    const s = shifts.filter((shift) => shift.shiftStart == startTime);
    const optionedShifts = s.map((shift) => <td>{generateSelects(shift)}</td>);
    return optionedShifts;
  }

  function generateSelects(shift: Shift) {
    const g = shift.staff.map((staff) => <select>{generateOptions(staff)}</select>);
    // console.log(g);
    return g;
  }

  function generateOptions(selectedStaff: Staff) {
    return staff.map((employee) => {
      return <option value={employee.name} selected={employee.id === selectedStaff.id}>{employee.name}</option>;
    });
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
            {generateShifts("10:00:00")}
          </tr>
          <tr>
            <td>17:00 - 23:00</td>
            {generateShifts("17:00:00")}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
