export interface CalendarButtonProp{
    day:Date,
    selectedDay:number | Date,
    setSelectedDay:(arg:Date)=>void,
    firstDayCurrentMonth:Date,
    isSaturday:boolean,
    isSunday:boolean,
    classNames:any
}