import React, { useState } from "react";
import { Reservation } from "../interfaces/reservationInterface";
import ReservationForm from "../components/ReservationForm";
import ReservationList from "../components/ReservationList";

export default function ReservationPage() {
  const [reservation, setReservation] = useState<Reservation | undefined>();

  return (
    <div>
      <ReservationForm existingReservation={reservation} />
      <ReservationList onEdit={setReservation} />
    </div>
  );
}
