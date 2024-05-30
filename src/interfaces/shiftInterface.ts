export interface Shift {
  id: number;
  shiftStart: string;
  shiftEnd: string;
  DayOfWeek: DayOfWeek;
  staff: Staff[];
}

export interface DailyShifts {
  morning: Shift;
  evening: Shift;
}

export interface Workers {
  [key: string]: DailyShifts;
}

export interface Staff {
  id: number;
  name: string;
  StaffRoles: string;
}

export enum DayOfWeek {
  Monday = "MONDAY",
  Tuesday = "TUESDAY",
  Wednesday = "WEDNESDAY",
  Thursday = "THURSDAY",
  Friday = "FRIDAY",
  Saturday = "SATURDAY",
  Sunday = "SUNDAY",
}
