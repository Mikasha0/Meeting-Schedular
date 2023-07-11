import { startOfToday } from "date-fns";
export default function CalendarButton({
  isEqual,
  isToday,
  day,
  selectedDay,
  setSelectedDay,
  firstDayCurrentMonth,
  isSameMonth,
  isSaturday,
  isSunday,
  format,
  classNames,
}: any) {

  const currentDate = startOfToday();
  console.log(currentDate);
  const nextDay = startOfToday();
  nextDay.setDate(day.getDate() + 3);
  
  
  return (
    <button
      type="button"
      onClick={() => {
        setSelectedDay(day);
      }}
      className={classNames(
        isEqual(day, selectedDay) && "text-white",
        !isEqual(day, selectedDay) && isToday(day) && "text-red-400",

        !isEqual(day, selectedDay) &&
          !isToday(day) &&
          isSameMonth(day, firstDayCurrentMonth) &&
          "text-black",

        !isEqual(day, selectedDay) &&
          !isToday(day) &&
          !isSameMonth(day, firstDayCurrentMonth) &&
          "text-gray-900",
        isEqual(day, selectedDay) && isToday(day) && " bg-black text-red-600",
        isEqual(day, selectedDay) && !isToday(day) && "bg-black text-white",
        !isEqual(day, selectedDay) && "button-background hover:bg-white",
        (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
        "mx-auto flex button-size items-center justify-center rounded-lg",
        (isSaturday || isSunday) &&
          "pointer-events-none button-background-disabled", // Disable Saturdays and Sundays except for the current date
        day <= currentDate &&
          !isToday(day) &&
          "pointer-events-none button-background-disabled", // Disable past dates except for the current date
      )}
    >
      <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
    </button>
  );
}
