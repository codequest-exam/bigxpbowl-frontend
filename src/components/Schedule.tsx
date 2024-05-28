import React, { useState } from "react";
import "../styling/schedule.css";

interface ScheduleProps {}

interface Shift {
  start: string;
  end: string;
  workers: string[];
}

interface DailyShifts {
  morning: Shift;
  evening: Shift;
}

interface Workers {
  [key: string]: DailyShifts;
}

const allStaffMembers = ["Joakim", "Marcus", "Laurits", "Buster"];

const initialWorkers: Workers = {
  Monday: {
    morning: { start: "10:00", end: "16:30", workers: ["Buster"] },
    evening: { start: "16:30", end: "23:00", workers: ["Buster"] },
  },
  Tuesday: {
    morning: { start: "10:00", end: "16:30", workers: ["Laurits"] },
    evening: { start: "16:30", end: "23:00", workers: ["Laurits"] },
  },
  Wednesday: {
    morning: { start: "10:00", end: "16:30", workers: ["Marcus"] },
    evening: { start: "16:30", end: "23:00", workers: ["Marcus"] },
  },
  Thursday: {
    morning: { start: "10:00", end: "16:30", workers: ["Joakim"] },
    evening: { start: "16:30", end: "23:00", workers: ["Joakim"] },
  },
  Friday: {
    morning: { start: "10:00", end: "16:30", workers: ["Joakim"] },
    evening: { start: "16:30", end: "23:00", workers: ["Joakim"] },
  },
  Saturday: {
    morning: { start: "10:00", end: "16:30", workers: ["Joakim"] },
    evening: { start: "16:30", end: "23:00", workers: ["Joakim"] },
  },
  Sunday: {
    morning: { start: "10:00", end: "16:30", workers: ["Buster"] },
    evening: { start: "16:30", end: "23:00", workers: ["Joakim"] },
  },
};

const Schedule: React.FC<ScheduleProps> = () => {
  const [workers, setWorkers] = useState<Workers>(initialWorkers);
  const days: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const hours: string[] = ["10:00-16:30", "16:30-23:00"];

  const handleWorkerChange = (
    day: string,
    shiftType: string,
    index: number,
    newWorker: string
  ) => {
    setWorkers((prevWorkers) => {
      const updatedWorkers = [...prevWorkers[day][shiftType].workers];
      updatedWorkers[index] = newWorker;

      return {
        ...prevWorkers,
        [day]: {
          ...prevWorkers[day],
          [shiftType]: {
            ...prevWorkers[day][shiftType],
            workers: updatedWorkers,
          },
        },
      };
    });
  };

  const addWorker = (day: string, shiftType: string) => {
    setWorkers((prevWorkers) => {
      const updatedWorkers = [...prevWorkers[day][shiftType].workers, ""];

      return {
        ...prevWorkers,
        [day]: {
          ...prevWorkers[day],
          [shiftType]: {
            ...prevWorkers[day][shiftType],
            workers: updatedWorkers,
          },
        },
      };
    });
  };

  const removeWorker = (day: string, shiftType: string, index: number) => {
    setWorkers((prevWorkers) => {
      const updatedWorkers = prevWorkers[day][shiftType].workers.filter(
        (_, i) => i !== index
      );

      return {
        ...prevWorkers,
        [day]: {
          ...prevWorkers[day],
          [shiftType]: {
            ...prevWorkers[day][shiftType],
            workers: updatedWorkers,
          },
        },
      };
    });
  };

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
                          <select
                            value={worker}
                            onChange={(e) =>
                              handleWorkerChange(
                                day,
                                "morning",
                                index,
                                e.target.value
                              )
                            }
                          >
                            <option value="">None</option>
                            {allStaffMembers.map((staffMember) => (
                              <option key={staffMember} value={staffMember}>
                                {staffMember}
                              </option>
                            ))}
                          </select>
                          <button
                            className="remove-worker-button"
                            onClick={() => removeWorker(day, "morning", index)}
                          >
                            -
                          </button>
                        </div>
                      ))
                    : workers[day].evening.workers.map((worker, index) => (
                        <div key={index} className="worker-select">
                          <select
                            value={worker}
                            onChange={(e) =>
                              handleWorkerChange(
                                day,
                                "evening",
                                index,
                                e.target.value
                              )
                            }
                          >
                            <option value="">None</option>
                            {allStaffMembers.map((staffMember) => (
                              <option key={staffMember} value={staffMember}>
                                {staffMember}
                              </option>
                            ))}
                          </select>
                          <button
                            className="remove-worker-button"
                            onClick={() => removeWorker(day, "evening", index)}
                          >
                            -
                          </button>
                        </div>
                      ))}
                  <button
                    className="add-worker-button"
                    onClick={() =>
                      addWorker(day, shiftIndex === 0 ? "morning" : "evening")
                    }
                  >
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
};

export default Schedule;
