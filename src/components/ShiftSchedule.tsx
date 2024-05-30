import { useEffect, useState } from "react";
import { Shift, DayOfWeek, Staff } from "../interfaces/shiftInterface.ts";
import { getShifts, getStaff, submitStaffChange } from "../services/apiFacade";
import "../styling/shift.css";

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
    fetchStaff();
  }, []);

  function createDaysHeader() {
    return Object.values(DayOfWeek).map((day) => {
      return <th key={day}>{day}</th>;
    });
  }

  function generateShifts(startTime: string) {
    const s = shifts.filter((shift) => shift.shiftStart == startTime);
    // console.log(shifts[0]);

    const optionedShifts = s.map((shift) => {
      return (
        <td key={shift.id} className="option-container">
          {generateSelects(shift)} <button onClick={() => addOption(shift)}>Add shift spot</button>
        </td>
      );
    });
    return optionedShifts;
  }

  function generateSelects(shift: Shift) {
    // console.log("shift",shift);
    const g = shift.staff.map((staff) => {
      return (
        <div key={shift.staff.indexOf(staff).toString()}>
          <select name={shift.staff.indexOf(staff).toString()} onChange={(e) => staffChanged(e, shift)} defaultValue={staff.name} className="select-dropdown">
            {generateOptions(shift)}
          </select>
          
          <img src="src/assets/red_x.png" alt="remove" style={{height:"10px", cursor:"pointer"}}  onClick={() => removeOption(shift, shift.staff.indexOf(staff))} />
        </div>
      );
    });
    return g;
  }

  function generateOptions(shift: Shift) {
    // selected={employee.id === selectedStaff?.id}
    const temp = [<option key={"0"} value={""}>Select staff</option>];
    temp.push(
      ...staff.map((employee) => {
        return (
          <option
            value={employee.name}
            key={employee.id}
            disabled={shift.staff.some((staff) => {
              return staff.id === employee.id;
            })}
          >
            {employee.name}
          </option>
        );
      })
    );
    return temp;
  }

  function addOption(shift: Shift) {
    shift.staff.push({ id: 0, name: "", role: "EMPLOYEE" });
    setShifts([...shifts]);
  }

  async function removeOption(shift: Shift, index: number) {
    shift.staff.splice(index, 1);
    const updatedShift = await submitStaffChange(shift);
    if (updatedShift.id) {
      setShifts([...shifts]);
    }
  }

  async function staffChanged(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, shift: Shift) {
    console.log("staff changed", shift);
    console.log("e", e.target.name, e.target.value);
    // console.log(e.);

    console.log("shift.staff", shift.staff[parseInt(e.target.name)]);
    const previousStaff = shift.staff[parseInt(e.target.name)];

    const newStaff = staff.find((staff) => staff.name === e.target.value);
    if (previousStaff && newStaff) {
      previousStaff.id = newStaff.id;
      previousStaff.name = newStaff.name;
      previousStaff.role = newStaff.role;
      const updatedShift = await submitStaffChange(shift);
      if (updatedShift.id) {
        shifts[shifts.indexOf(shift)] = updatedShift;
        setShifts([...shifts]);
      }
    }
    // const newList = shift.staff.map((staff) => {
    //   return { id: staff.id, name: staff.name, role: staff.role };
    // });
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
