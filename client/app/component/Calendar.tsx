import {BsChevronLeft, BsChevronRight} from 'react-icons/bs'
import CalendarButton from "./CalendarButton";
import { format } from "date-fns";

export default function Calendar({
  firstDayCurrentMonth,
  previousMonth,
  nextMonth,
  Weekday,
  days,
  getDay,
  classNames,
  colStartClasses,
  setSelectedDay,
  selectedDay,
}: any) {
  return (
    <div className="md:pr-4 md:pl-4 pt-5 pb-3 calendar-dimension">
      <div className="flex items-center">
        <h2 className="flex-auto font-semibold text-black">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </h2>
        <button
          type="button"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <BsChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <BsChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
        {Object.values(Weekday).map((day: any) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 mt-2 text-sm font-medium">
        {days.map((day: any, dayIdx: any) => {
          const isSaturday = getDay(day) === 6; // 6 represents Saturday
          const isSunday = getDay(day) === 0; // 0 represents Sunday
          return (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "px-0"
              )}
            >
              <CalendarButton
                day={day}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                firstDayCurrentMonth={firstDayCurrentMonth}
                isSaturday={isSaturday}
                isSunday={isSunday}
                classNames={classNames}
              />

              <div className="w-1 h-1 mx-auto mt-0.5"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
