export interface Equipment {
  id: number;
  name: string;
  stock: number;
}
export interface EquipmentFormData {
  id?: number;
  name: string;
  stock: number;

  [key: string]: string | number | undefined;
}


export interface Maintainable {
  laneNumber?: number;
  tableNumber?: number;
  maintenance: boolean;
  childFriendly?: boolean;
  activityType: "DINING"| "BOWLING"| "AIRHOCKEY" | "CHILDBOWLING"
}

// export enum ActivityType {
//   "DINING", "BOWLING", "AIRHOCKEY" , "CHILDBOWLING"
// }