import React, { useEffect, useState } from "react";
import "./reservations.css";
import { getReservations } from "../services/apiFacade";
import { ReservationListItem } from "../interfaces/reservationInterface";

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationListItem[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const reservationsList = await getReservations();
      console.log(reservationsList);

      setReservations(reservationsList);
    };

    fetchReservations();
  }, []);

  const handleEdit = (id: number) => {
    console.log("Edit reservation with id: ", id);

    // Handle edit logic here
  };

  const handleDelete = (id: number) => {
    console.log("Delete reservation with id: ", id);

    // Handle delete logic here
  };

  return (
    <div className="reservations-page">
      <h1 className="reservations-header">Reservations</h1>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Number of Participants</th>
            <th>Date</th>
            <th>Chosen Activities</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.name}</td>
              <td>{reservation.participants}</td>
              <td>{reservation.phoneNumber}</td>
              {/* <td>{reservation.activities}</td>
              <td>{reservation.date}</td> */}
              {/* <td>{reservation.duration}</td>
              <td>{reservation.startTime}</td>
              <td>{reservation.activity}</td>

              <td>{reservation.chosenActivities}</td> */}
              <td>
                <button className="edit-button" onClick={() => handleEdit(reservation.id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(reservation.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
