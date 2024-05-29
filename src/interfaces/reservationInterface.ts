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
export interface RecurringReservation {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  phoneNumber: string;
  name: string;
  participants: number;
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
  activities: Array<"DINING" | "BOWLING" | "AIRHOCKEY" | "CHILDBOWLING">;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ReservationWithStringDates {
  id?: number;
  name: string;
  phoneNumber: string;
  participants: number;
  activities: Array<ChosenActivityWithStringDates>;
  
  [key: string]: string | number | Date | Array<ChosenActivityWithStringDates> | undefined;
}

export interface ChosenActivityWithStringDates {
  id?: number;
  amountBooked: number;
  activityType: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ReservationFormData {
  id?: number;
  name: string;
  phoneNumber: string;
  participants: number;
  activityType: "" |"DINING" | "BOWLING" | "AIRHOCKEY" | "CHILDBOWLING" ;
  amount: number;
  date: string;
  startTime: string;
  duration: string;
  activities: Array<ChosenActivityWithStringDates>;

  [key: string]: string | number | Date | Array<ChosenActivityWithStringDates> | undefined;
}
export interface CompetitionDay {
  date: Date;
}

export interface AvailableForDay {
  bowlingLanes: HourInfo[];
  childLanes: HourInfo[];
  airHockeyTables: HourInfo[];
  diningTables: HourInfo[];

  [key: string]: HourInfo[];
}

export interface HourInfo {
  hour: string;
  amountAvailable: number;
}
