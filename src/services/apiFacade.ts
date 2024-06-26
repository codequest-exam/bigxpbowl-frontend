import { RecurringReservation, ReservationListItem, ReservationWithStringDates, CompetitionDay, AvailableForDay } from "../interfaces/reservationInterface.ts";
import { Product } from "../interfaces/productInterface.ts";
import { Equipment, Maintainable } from "../interfaces/equipmentInterface.ts";
import { API_URL } from "../settings.ts";
import { Shift } from "../interfaces/shiftInterface.ts";

async function getReservations(): Promise<Array<ReservationListItem>> {
  return fetch(API_URL + "/reservations/all").then(handleHttpErrors);
}

async function getReservationsPaginated(page: number): Promise<Array<ReservationListItem>> {
  console.log("current page", page);

  return fetch(API_URL + "/reservations/all/" + page).then(handleHttpErrors);
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

async function getAvailableForDay(day: string): Promise<AvailableForDay> {
  const res = await fetch(API_URL + "/activities/available/" + day).then(handleHttpErrors);
  console.log(res);
  return res;
}

async function getProducts(): Promise<Array<Product>> {
  return fetch(API_URL + "/products").then(handleHttpErrors);
}
async function createProduct(product: Product) {
  const options = makeOptions("POST", product);
  return fetch(API_URL + "/products", options).then(handleHttpErrors);
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

async function getSingleReservation(id: number): Promise<ReservationWithStringDates> {
  const reservation = await fetch(API_URL + "/reservations/" + id).then(handleHttpErrors);
  console.log(reservation);

  return reservation;
}

async function getRecurringReservations(): Promise<Array<RecurringReservation>> {
  return fetch(API_URL + "/reservations/recurring").then(handleHttpErrors);
}

async function getCompetitionDays(): Promise<Array<CompetitionDay>> {
  const competitionDays = await fetch(API_URL + "/reservations/competition-day").then(handleHttpErrors);
  return competitionDays;
}

async function submitReservation(newReservation: ReservationWithStringDates) {
  const URL = newReservation.id ? API_URL + "/reservations/" + newReservation.id : API_URL + "/reservations";
  const options = makeOptions(newReservation.id ? "PUT" : "POST", newReservation);
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
  const tempArray: Maintainable[] = [];
  console.log(res);
  // Res is an object with 3 arrays of maintainables. We want to combine them into one array for easier handling
  for (const list in res) {
    res[list].forEach((item: Maintainable) => {
      tempArray.push(item);
    });
  }
  console.log("tempArray", tempArray);
  return tempArray;
}

async function getShifts() {
  return fetch(`${API_URL}/shifts/all`).then(handleHttpErrors);
}

async function getStaff() {
  return fetch(`${API_URL}/shifts/staff`).then(handleHttpErrors);
}

async function submitShift(shift: Shift) {  
  // shift = {... shift, shift.staff}
  console.log(shift);
  
  const cleanedStaff = shift.staff.filter((staff) => staff.id > 0);
  console.log("cleanedStaff", cleanedStaff);
  
  shift.staff = cleanedStaff;
  const options = makeOptions("PUT", shift);
  return fetch(`${API_URL}/shifts/${shift.id}`,options).then(handleHttpErrors);
}

async function changeMaintenanceStatus(maintainable: Maintainable) {
  console.log("maintainable", maintainable);

  return fetch(`${API_URL}/maintenance/change/${maintainable.activityType == "CHILDBOWLING" ? "BOWLING" : maintainable.activityType}/${maintainable.laneNumber || maintainable.tableNumber}`).then(handleHttpErrors);
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
  createProduct,
  updateProduct,
  deleteProduct,
  getEquipment,
  updateEquipment,
  getAvailableSlots,
  getMaintainables,
  changeMaintenanceStatus,
  getAvailableForDay,
  getReservationsPaginated,
  getShifts,
  getStaff,
  submitShift as submitStaffChange,
};
