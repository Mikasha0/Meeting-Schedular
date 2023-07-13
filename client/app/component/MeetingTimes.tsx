import {format,startOfToday} from 'date-fns'
import { MeetingTimesProps } from '~/types/meeting-times.types';

export default function MeetingTimes({selectedDay,timeValues, data, navigate,setVisible,visible}:MeetingTimesProps) {
  return (
    <section className="mt-12 md:mt-0 md:pl-8 pt-5 pb-5">
    <div className="date-time flex justify-between">
      <h2 className="font-semibold text-black">
        <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
          {format(selectedDay, "eee dd")}
        </time>
      </h2>
      <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
        12h
      </kbd>
    </div>

    {timeValues.map((time) => (
      <button
        key={time}
        type="button"
        className="text-black flex justify-center hover:text-white border border-gray-300 hover:bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-0 mt-3"
        style={{ width: "230px" }}
        onClick={() => {
          const currentDate = startOfToday();
          let selectedDate = new Date(selectedDay);
          const year = selectedDay.getFullYear().toString();
          const month = (selectedDay.getMonth() + 1).toString();
          const day1 = selectedDay.getDate();
          const date = year + "/" + month + "/" + day1;
          if (data.id) {
            console.log(data.id);
            navigate(
              `/meeting/?reschedule=${data.id}/&time=${time}&date=${date}`
            );
            setVisible(!visible);
          } else if (selectedDate <= currentDate) {
            console.log("Error: Selected date is in the past");
            navigate("/error");
            return;
          } else {
            navigate(`/meeting/?time=${time}&date=${date}`);
            setVisible(!visible);
          }
        }}
      >
        {time}
      </button>
    ))}
  </section>  )
}
