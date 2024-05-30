import { useEffect} from "react";
import "../styling/reservations.css";
import { getSingleReservation, deleteReservation, getReservationsPaginated } from "../services/apiFacade.ts";
import { ReservationListItem, ReservationFormData } from "../interfaces/reservationInterface";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ReservationList({ setFormData, reservations, setReservations, currentPage, setCurrentPage}: 
  { setFormData: React.Dispatch<React.SetStateAction<ReservationFormData>>, reservations: ReservationListItem[], 
    setReservations: React.Dispatch<React.SetStateAction<ReservationListItem[]>>
    currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  }) {
    

      useEffect(() => {
        const fetchReservations = async () => {
          console.log("current page", currentPage);
          
          const reservationsList = await getPaginatedReservations();
          console.log(reservationsList);

          setReservations(reservationsList);
        };

        fetchReservations();
      }, [currentPage]);

  async function getPaginatedReservations() {
    return await getReservationsPaginated(currentPage);
  }
  

  const handleEdit = async (id: number) => {
    console.log("Edit reservation with id: ", id);

    // Handle edit logic here

    const reservation = await getSingleReservation(id);
    console.log("single reservation", reservation);

    setFormData(() => ({
      // ... prev,
      id: reservation.id,
      name: reservation.name,
      phoneNumber: reservation.phoneNumber,
      participants: reservation.participants,
      activities: reservation.activities,
      date: reservation.activities.length > 0 ? reservation.activities[0].date : "",
      duration: "",
      startTime: "",
      activityType: "",
      amount: 1,
    }));
    // onEdit(reservation);
  };

  const handleDelete = async (id: number) => {
    console.log("Delete reservation with id: ", id);
    try {
      await deleteReservation(id);
      setReservations(await getReservationsPaginated(currentPage));
      toast.success("Reservation deleted");
      console.log("Reservation deleted");
    } catch (error) {
      toast.error("Could not delete reservation, something went wrong.");
      console.error(error);
    }
  };

  return (
    <div className="reservations-page">
      <ToastContainer />
      <h2 className="reservations-header">Reservations</h2>
      <div style={{display:"flex", flexDirection:"row", margin:"1vw", gap:"10px"}}>
        <button disabled={currentPage==0} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        <div>Current page: {currentPage+1}</div>
      </div>
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
              <td>{reservation.phoneNumber}</td>
              <td>{reservation.participants}</td>
              <td>{reservation.date}</td>
              <td style={{ whiteSpace: "pre" }}>
                {reservation.activities
                  .map((activity) => {
                    return activity.substring(0, 1).toLocaleUpperCase() + activity.substring(1).toLocaleLowerCase();
                  })
                  .join("\n")}
              </td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(reservation.id)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(reservation.id)}>
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
