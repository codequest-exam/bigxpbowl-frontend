import {
  RecurringReservation,
  ReservationListItem,
  ReservationWithStringDates,
  CompetitionDay,
} from "../interfaces/reservationInterface.ts";
import { Product } from "../interfaces/productInterface.ts";
import { Equipment } from "../interfaces/equipmentInterface.ts";
import { API_URL } from "../settings.ts";
import { Maintainable } from "../pages/MaintenancePage.tsx";

async function getReservations(): Promise<Array<ReservationListItem>> {
  return fetch(API_URL + "/reservations").then(handleHttpErrors);
  // const data = await fetch(API_URL + "/reservations");
  // const reservations = await data.json();
  // console.log(reservations);
  // return reservations;
}

async function getAvailableSlots(date: string, startTime: string, endTime: string, activityType: string): Promise<number> {
  const reqObj = { date, startTime, endTime, activityType };
  console.log(reqObj);

  const URL = `${API_URL}/activities/available`;
  const options = makeOptions("POST", reqObj);
  const result = await fetch(URL, options).then(handleHttpErrors);
  console.log(result);
  return result;
}

async function getProducts(): Promise<Array<Product>> {
  return fetch(API_URL + "/products").then(handleHttpErrors);
}
async function updateProduct(id: number, product: Product) {
  const options = makeOptions("PUT", product);
  return fetch(`${API_URL}/products/${id}`, options).then(handleHttpErrors);
}
async function deleteProduct(id: number) {
  const options = makeOptions("DELETE", null);
  const response = await fetch(API_URL + "/products/" + id, options);
  return response.status;
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

async function getEquipment() {
  return fetch(API_URL + "/equipment").then(handleHttpErrors);
}

async function updateEquipment(id: number, equipment: Equipment) {
  const options = makeOptions("PUT", equipment);
  return fetch(`${API_URL}/equipment/${id}`, options).then(handleHttpErrors);
}

async function getMaintainables() {
  const res = await fetch(API_URL + "/maintenance/all").then(handleHttpErrors);
  const tempArray: Maintainable[] = []
  console.log(res);
  
  for (const list in res) {
    // tempArray.push(...list);
    // console.log(list);
    // console.log(res[list]);
    res[list].forEach((item: Maintainable) => {
      tempArray.push(item);
    });
    
  }
  console.log("tempArray", tempArray);  
  return tempArray;
}

async function changeMaintenanceStatus(maintainable: Maintainable) {
  console.log("maintainable", maintainable);
  
  return fetch(`${API_URL}/maintenance/change/${maintainable.activityType}/${maintainable.laneNumber || maintainable.tableNumber}`).then(handleHttpErrors);

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
  getProducts,
  updateProduct,
  deleteProduct,
  getEquipment,
  updateEquipment,
  getAvailableSlots,
  getMaintainables,
  changeMaintenanceStatus,
};
