import {
  RecurringReservation,
  ReservationListItem,
  ReservationWithStringDates,
  CompetitionDay,
} from "../interfaces/reservationInterface";
import { Equipment } from "../interfaces/equipmentInterface";
import { API_URL } from "../settings.ts";

async function getReservations(): Promise<Array<ReservationListItem>> {
  return fetch(API_URL + "/reservations").then(handleHttpErrors);
  // const data = await fetch(API_URL + "/reservations");
  // const reservations = await data.json();
  // console.log(reservations);
  // return reservations;
}

async function getSingleReservation(
  id: number
): Promise<ReservationWithStringDates> {
  const reservation = await fetch(API_URL + "/reservations/" + id).then(
    handleHttpErrors
  );
  console.log(reservation);

  return reservation;
}

async function getRecurringReservations(): Promise<
  Array<RecurringReservation>
> {
  return fetch(API_URL + "/reservations/recurring").then(handleHttpErrors);
}

async function getCompetitionDays(): Promise<Array<CompetitionDay>> {
  const competitionDays = await fetch(
    API_URL + "/reservations/competition-day"
  ).then(handleHttpErrors);
  return competitionDays;
}

async function submitReservation(newReservation: ReservationWithStringDates) {
  const URL = newReservation.id
    ? API_URL + "/reservations/" + newReservation.id
    : API_URL + "/reservations";
  const options = makeOptions(
    newReservation.id ? "PUT" : "POST",
    newReservation
  );
  return await fetch(URL, options).then(handleHttpErrors);
}

async function deleteReservation(id: number) {
  const options = makeOptions("DELETE", null);
  const response = await fetch(API_URL + "/reservations/" + id, options);
  return response.status;
}

function makeOptions(method: string, body: object | null): RequestInit {
  const opts: RequestInit = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

async function handleHttpErrors(res: Response) {
  if (!res.ok) {
    const fullError = await res.json();
    throw { status: res.status, fullError };
  }
  if (res.status === 204) {
    return {};
  }

  return res.json();
}
async function getEquipment() {
  return fetch(API_URL + "/equipment").then(handleHttpErrors);
}
async function updateEquipment(id: number, equipment: Omit<Equipment, "id">) {
  const options = makeOptions("PUT", equipment);
  return fetch(`${API_URL}/equipment/${id}`, options).then(handleHttpErrors);
}
// function makeDates(reservation: Reservation) {
//   const startDate = new Date(reservation.activities[0].date);
//   console.log(new Date(startDate).setHours(reservation.activities[0].startTime.split(":")[0], reservation.activities[0].startTime.split(":")[1]));

//   reservation.activities.forEach((activity) => {
//     activity.date = startDate;
//     // activity.startTime = new Date(startDate).setHours(activity.startTime.split(":")[0], activity.startTime.split(":")[1]);
//     activity.endTime = new Date(activity.endTime);
//   });
// }

export {
  getReservations,
  getSingleReservation,
  submitReservation,
  deleteReservation,
  getRecurringReservations,
  getCompetitionDays,
  getEquipment,
  updateEquipment,
};
