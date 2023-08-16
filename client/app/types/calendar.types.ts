import { Weekday } from "./z.schema";

export interface calendarTypes {
  firstDayCurrentMonth: Date;
  previousMonth: () => void;
  nextMonth: () => void;
  Weekday: typeof Weekday;
  days: Date[];
  getDay: (date: Date | number) => number;
  classNames: any;
  colStartClasses: any;
  setSelectedDay: (arg: Date) => void;
  selectedDay: number | Date;
}
