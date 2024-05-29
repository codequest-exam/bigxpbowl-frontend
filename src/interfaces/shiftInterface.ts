export interface Shift {
  id: number;
  shiftStart: string;
  shiftEnd: string;
  staff: Staff[];
}

export interface DailyShifts {
  morning: Shift;
  evening: Shift;
}

export interface Workers {
  [key: string]: DailyShifts;
}
