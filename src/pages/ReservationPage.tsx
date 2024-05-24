import  { useState } from "react";
import { ReservationFormData, ChosenActivityWithStringDates, ReservationListItem } from "../interfaces/reservationInterface";
import ReservationForm from "../components/ReservationForm";
import ReservationList from "../components/ReservationList";




 const defaultFormObj = {
  id: 0,
  name: "",
  phoneNumber: "",
  participants: 1,
  date: "",
  activityType: "",
  startTime: "10:00",
  duration: "",
  amount: 1,
  activities: Array<ChosenActivityWithStringDates>(),
};

export default function ReservationPage() {
  
  const [formData, setFormData] = useState<ReservationFormData>(defaultFormObj);
const [reservations, setReservations] = useState<ReservationListItem[]>([]);


  return (
    <div style={{ display: "flex", margin: "1rem", padding: "1vw", gap: "2vw" }}>
      <div>
        <ReservationForm
          setFormData={setFormData}
          formData={formData}
          setReservations={setReservations}
          defaultFormObj={defaultFormObj}
        />
      </div>
      <div>
        <ReservationList setFormData={setFormData} reservations={reservations} setReservations={setReservations} />
      </div>
    </div>
  );
}
