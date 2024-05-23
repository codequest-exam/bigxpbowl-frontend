import { useEffect, useState } from "react";
import "../styling/reservations.css";
import { getReservations, getSingleReservation } from "../services/apiFacade";
import {
  ReservationListItem,
  ReservationFormData,
} from "../interfaces/reservationInterface";

function ReservationList({
  setFormData,
}: {
  setFormData: React.Dispatch<React.SetStateAction<ReservationFormData>>;
}) {
  const [reservations, setReservations] = useState<ReservationListItem[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const reservationsList = await getReservations();
      console.log(reservationsList);

      setReservations(reservationsList);
    };

    fetchReservations();
  }, []);

  const handleEdit = async (id: number) => {
    console.log("Edit reservation with id: ", id);

    // Handle edit logic here

    const reservation = await getSingleReservation(id);
    console.log(reservation);

    setFormData({
      id: reservation.id,
      name: reservation.name,
      phoneNumber: reservation.phoneNumber,
      participants: reservation.participants,
      activities: reservation.activities,
      date: reservation.activities[0].date,
      startTime: "",
      duration: "",
      activityType: "",
    });
    // onEdit(reservation);
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
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.name}</td>
              <td>{reservation.participants}</td>
              <td>{reservation.phoneNumber}</td>
              <td>{reservation.date}</td>
              <td>
                {reservation.activities.map((activity) => {
                  return (
                    //@ts-expect-error - it is not possible to assign a string to a ChosenActivity
                    activity.substring(0, 1) +
                    //@ts-expect-error - it is not possible to assign a string to a ChosenActivity

                    activity.substring(1).toLocaleLowerCase() +
                    "\n"
                  );
                })}
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(reservation.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(reservation.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationList;
