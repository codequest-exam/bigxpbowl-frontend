import { useEffect, useState } from "react";
import { getReservations } from "../services/apiFacade";
import "./calendar.css";

interface Reservation {
  id: number;
  name: string;
  phoneNumber: string;
  participants: number;
  date: string;
  startTime: string;
  endTime: string;
  activities: Array<string>;
}

export default function Calendar() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initial date set to today

  useEffect(() => {
    const fetchReservations = async () => {
      const reservationsList = await getReservations();
      setReservations(reservationsList);
    };

    fetchReservations();
  }, []);

  // Helper function to check if a reservation overlaps with the given time slot
  const isReservationInSlot = (reservation: Reservation, timeSlot: string) => {
    const startTime = new Date(
      `${reservation.date}T${reservation.startTime}`
    ).getTime();
    const endTime = new Date(
      `${reservation.date}T${reservation.endTime}`
    ).getTime();
    const slotTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      parseInt(timeSlot.split(":")[0]),
      parseInt(timeSlot.split(":")[1])
    ).getTime();

    return slotTime >= startTime && slotTime < endTime;
  };

  // Helper function to count the number of reservations for a given activity and time slot
  const countReservations = (activity: string, timeSlot: string) => {
    return reservations.filter(
      (reservation) =>
        reservation.activities.includes(activity) &&
        isReservationInSlot(reservation, timeSlot)
    ).length;
  };

  // Function to handle date change
  const handleDateChange = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleDateChange(-1)}>Previous Day</button>
        <button onClick={() => handleDateChange(1)}>Next Day</button>
      </div>
      <table className="calendar-table">
        <thead>
          <tr>
            <th>{selectedDate.toLocaleDateString()}</th>
            <th>Bowling</th>
            <th>Dining</th>
            <th>Airhockey</th>
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
          ].map((timeSlot, index) => (
            <tr key={index}>
              <td>{timeSlot}</td>
              <td>{countReservations("BOWLING", timeSlot)}</td>
              <td>{countReservations("DINING", timeSlot)}</td>
              <td>{countReservations("AIRHOCKEY", timeSlot)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
