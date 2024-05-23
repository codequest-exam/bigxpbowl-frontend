import { useEffect, useState } from "react";
import {
  getReservations,
  getRecurringReservations,
} from "../services/apiFacade";
import {
  RecurringReservation,
  Reservation,
} from "../interfaces/reservationInterface";
import "./calendar.css";

interface Week {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
}

export default function Calendar() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedActivity, setSelectedActivity] = useState("BOWLING");
  const [selectedWeek, setSelectedWeek] = useState<Week>();
  const [recurringReservations, setRecurringReservations] = useState<
    RecurringReservation[]
  >([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const reservationsList = await getReservations();
      setReservations(reservationsList);
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    const fetchRecurringReservations = async () => {
      const recurringReservationsList = await getRecurringReservations();
      setRecurringReservations(recurringReservationsList);
    };
    fetchRecurringReservations();
  }, []);

  useEffect(() => {
    setSelectedWeek(calculateWeekDates(getWeekNumber(new Date())));
  }, []);

  const calculateWeekDates = (weekNumber: number): Week => {
    const firstDayOfYear = new Date(
      Date.UTC(new Date().getUTCFullYear(), 0, 1)
    );
    const firstWeekday = firstDayOfYear.getUTCDay();
    const daysOffset = (weekNumber - 1) * 7 - firstWeekday;
    const startDate = new Date(
      Date.UTC(
        firstDayOfYear.getUTCFullYear(),
        firstDayOfYear.getUTCMonth(),
        firstDayOfYear.getUTCDate() + daysOffset + 1
      )
    );
    const endDate = new Date(startDate);
    endDate.setUTCDate(startDate.getUTCDate() + 6);
    return { weekNumber, startDate, endDate };
  };

  const getWeekNumber = (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const handleWeekChange = (weekOffset: number) => {
    const newWeekNumber = (selectedWeek?.weekNumber || 1) + weekOffset;
    setSelectedWeek(calculateWeekDates(newWeekNumber));
  };

  const countReservations = (
    activity: string,
    date: Date,
    timeSlot: string
  ) => {
    const formattedDate = date.toISOString().split("T")[0];
    const timeSlotHour = parseInt(timeSlot.split(":")[0]);
    const timeSlotMinutes = parseInt(timeSlot.split(":")[1]);

    const oneTimeReservationsCount = reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.date)
        .toISOString()
        .split("T")[0];
      const reservationStartTime = new Date(
        `1970-01-01T${reservation.startTime}`
      ).getTime();
      const reservationEndTime = new Date(
        `1970-01-01T${reservation.endTime}`
      ).getTime();
      const slotTime = new Date(`1970-01-01T${timeSlot}`).getTime();
      return (
        reservation.activities.includes(activity) &&
        reservationDate === formattedDate &&
        slotTime >= reservationStartTime &&
        slotTime < reservationEndTime
      );
    }).length;

    let recurringReservationsCount = 0;
    if (activity === "BOWLING") {
      const dayOfWeek = date
        .toLocaleString("en-US", { weekday: "long" })
        .toUpperCase();
      recurringReservationsCount = recurringReservations.filter(
        (reservation) => {
          const reservationStartTime = new Date(
            `1970-01-01T${reservation.startTime}`
          ).getTime();
          const reservationEndTime = new Date(
            `1970-01-01T${reservation.endTime}`
          ).getTime();
          const slotTime = new Date(`1970-01-01T${timeSlot}`).getTime();
          return (
            reservation.dayOfWeek === dayOfWeek &&
            slotTime >= reservationStartTime &&
            slotTime < reservationEndTime
          );
        }
      ).length;
    }

    return oneTimeReservationsCount + recurringReservationsCount;
  };

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(selectedWeek?.startDate || new Date());
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div>
      <div className="calendar-page">
        <button onClick={() => setSelectedActivity("BOWLING")}>Bowling</button>
        <button onClick={() => setSelectedActivity("DINING")}>Dining</button>
        <button onClick={() => setSelectedActivity("AIRHOCKEY")}>
          Airhockey
        </button>
        <button onClick={() => handleWeekChange(-1)}>Previous Week</button>
        <button onClick={() => handleWeekChange(1)}>Next Week</button>
      </div>
      <h2>{selectedActivity}</h2>
      <table className="calendar-table">
        <thead>
          <tr>
            <th colSpan={8}>
              Week {selectedWeek?.weekNumber}
              <br />
              {selectedWeek?.startDate.toLocaleDateString()} -{" "}
              {selectedWeek?.endDate.toLocaleDateString()}
            </th>
          </tr>
          <tr>
            <th>Time Slots</th>
            {daysOfWeek.map((date, index) => (
              <th key={index}>{date.toLocaleDateString()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
          ].map((timeSlot) => (
            <tr key={timeSlot}>
              <td>{timeSlot}</td>
              {daysOfWeek.map((date, index) => (
                <td key={index}>
                  {countReservations(selectedActivity, date, timeSlot)}/24
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
