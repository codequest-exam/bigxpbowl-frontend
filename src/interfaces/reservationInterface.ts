// interface Reservation {
//     id: number;
//     name: string;
//     phoneNumber: string;
//     numParticipants: number;
//     activity: string;
//     date: string;
//     startTime: string;
//     duration: string;
//     chosenActivities: string[];
//   }

export interface Reservation {
  id?: number;
  name: string;
  phoneNumber: string;
  participants: number;
  startTime: string;
  endTime: string;
  date: string;
  activities: Array<ChosenActivity>;
}

export interface ChosenActivity {
  id?: number;
  activityType: string;
  date: Date;
  startTime: Date;
  endTime: Date;
}

export interface ReservationListItem {
  id: number;
  name: string;
  phoneNumber: string;
  participants: number;
  activities: Array<ChosenActivity>;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ReservationWithStringDates {
  id: number;
  name: string;
  phoneNumber: string;
  participants: number;
  activities: Array<ChosenActivityWithStringDates>;
}

export interface ChosenActivityWithStringDates {
  id: number;
  amountBooked: number;
  activityType: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ReservationFormData {
  id: number;
  name: string;
  phoneNumber: string;
  participants: number;
  activityType: string;
  date: string;
  startTime: string;
  duration: string;
  activities: Array<ChosenActivityWithStringDates>;
}
