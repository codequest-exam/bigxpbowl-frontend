import { useEffect, useState } from "react";
import { getReservations } from "../services/apiFacade";
import { Reservation as APIReservation } from "../services/apiFacade";
import "./reservations.css";

interface Props {
  searchTerm: string;
}

const ReservationList: React.FC<Props> = () => {
  const [reservations, setReservations] = useState<Array<APIReservation>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getReservations()
      .then((res) => {
        setReservations(res);
      })
      .catch(() => setError("Error getting reservations. Please try again."));
  }, []);

  if (error) {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name: </th>
          <th>Phone Number: </th>
          <th>Number of participants: </th>
          <th>Activities booked: </th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => {

          return (
            <tr key={reservation.id}>
              <td className="center-text">{reservation.id}</td>
              <td>{reservation.name}</td>
              <td>
                {reservation.phoneNumber}
              </td>
              <td>
                {reservation.participants}
              </td>
              <td>{reservation.activities}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReservationList;
