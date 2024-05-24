import React, { useState } from "react";
import "../styling/schedule.css";

interface ScheduleProps {}

interface Shift {
  start: string;
  end: string;
  worker: string;
}

interface DailyShifts {
  morning: Shift;
  evening: Shift;
}

interface Workers {
  [key: string]: DailyShifts;
}

const allStaffMembers = [
  "Joakim",
  "Marcus",
  "Laurits",
  "Buster"
];

const initialWorkers: Workers = {
  Monday: {
    morning: { start: "10:00", end: "16:00", worker: "Buster" },
    evening: { start: "16:00", end: "22:00", worker: "Buster" },
  },
  Tuesday: {
    morning: { start: "10:00", end: "16:00", worker: "Laurits" },
    evening: { start: "16:00", end: "22:00", worker: "Laurits" },
  },
  Wednesday: {
    morning: { start: "10:00", end: "16:00", worker: "Marcus" },
    evening: { start: "16:00", end: "22:00", worker: "Marcus" },
  },
  Thursday: {
    morning: { start: "10:00", end: "16:00", worker: "Joakim" },
    evening: { start: "16:00", end: "22:00", worker: "Joakim" },
  },
  Friday: {
    morning: { start: "10:00", end: "16:00", worker: "Joakim" },
    evening: { start: "16:00", end: "22:00", worker: "Joakim" },
  },
  Saturday: {
    morning: { start: "10:00", end: "16:00", worker: "Joakim" },
    evening: { start: "16:00", end: "22:00", worker: "Joakim" },
  },
  Sunday: {
    morning: { start: "10:00", end: "16:00", worker: "Buster" },
    evening: { start: "16:00", end: "22:00", worker: "Joakim" },
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
  const hours: string[] = ["10:00-16:00", "16:00-22:00"];

  const handleWorkerChange = (
    day: string,
    shiftType: string,
    newWorker: string
  ) => {
    setWorkers((prevWorkers) => ({
      ...prevWorkers,
      [day]: {
        ...prevWorkers[day],
        [shiftType]: {
          ...prevWorkers[day][shiftType],
          worker: newWorker,
        },
      },
    }));
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
        <tbody>
          {hours.map((shift, shiftIndex) => (
            <tr key={shift}>
              <td>{shift}</td>
              {days.map((day) => (
                <td key={day + shift}>
                  <select
                    value={
                      shiftIndex === 0
                        ? workers[day].morning.worker
                        : workers[day].evening.worker
                    }
                    onChange={(e) =>
                      handleWorkerChange(
                        day,
                        shiftIndex === 0 ? "morning" : "evening",
                        e.target.value
                      )
                    }
                  >
                    {allStaffMembers.map((staffMember) => (
                      <option key={staffMember} value={staffMember}>
                        {staffMember}
                      </option>
                    ))}
                  </select>
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
