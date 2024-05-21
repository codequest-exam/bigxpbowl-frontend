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
    activities: Array<ChosenActivity>;
  }

  
export interface ChosenActivity {
    activity: string;
    date: Date;
    startTime: Date;
    endTime: Date;
  }

export interface ReservationListItem {
    id: number;
    name: string;
    phoneNumber: string;
    participants: number;
    activities: string;
    date: string;
}