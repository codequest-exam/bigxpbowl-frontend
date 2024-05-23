import  { useState } from "react";
import {  ReservationFormData, ChosenActivityWithStringDates } from "../interfaces/reservationInterface";
import ReservationForm from "../components/ReservationForm";
import ReservationList from "../components/ReservationList";




const defaultObj = {
  id: 0,
  name: "buster",
  phoneNumber: "",
  participants: 0,
  date: "",
  activityType: "",
  startTime: "10:00",
  duration: "",
  amount: 1,
  activities: Array<ChosenActivityWithStringDates>(),
};

export default function ReservationPage() {
  // const [reservationToUpdate, setReservationToUpdate] = useState<ReservationWithStringDates | undefined>();
  const [formData, setFormData] = useState<ReservationFormData>(defaultObj);
  

  return (
    <div style={{ display: "flex", margin: "1rem", padding: "1vw", gap: "2vw" }}>
      <div>
        <ReservationForm
          // existingReservation={reservationToUpdate}
          setFormData={setFormData}
          formData={formData}
          // setFormData={setFormData}
        />
      </div>
      <div>
        <ReservationList setFormData={setFormData} />
      </div>
    </div>
  );
}
