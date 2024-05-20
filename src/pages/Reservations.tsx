import React, { useEffect, useState } from "react";
import "./reservations.css";
import { getReservations } from "../services/apiFacade";

interface Reservation {
  id: number;
  name: string;
  phoneNumber: string;
  numParticipants: number;
  activity: string;
  date: string;
  startTime: string;
  duration: string;
  chosenActivities: string[];
}

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const reservationsList = await getReservations();
      setReservations(reservationsList);
    };

    fetchReservations();
  }, []);

  // const handleEdit = (id: number) => {
  //     // Handle edit logic here
  // };

  // const handleDelete = (id: number) => {
  //     // Handle delete logic here
  // };

  return (
    <div className="reservations-page">
      <h1 className="reservations-header">Reservations</h1>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Start Time</th>
            <th>Activity</th>
            <th>Number of Participants</th>
            <th>Phone Number</th>
            <th>Chosen Activities</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.name}</td>
              <td>{reservation.date}</td>
              <td>{reservation.duration}</td>
              <td>{reservation.startTime}</td>
              <td>{reservation.activity}</td>
              <td>{reservation.numParticipants}</td>
              <td>{reservation.phoneNumber}</td>
              <td>{reservation.chosenActivities}</td>
              <td>
                {/* <button onClick={() => handleEdit(reservation.id)}>Edit</button>
                                <button onClick={() => handleDelete(reservation.id)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
