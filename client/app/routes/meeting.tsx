import { Menu, Transition } from "@headlessui/react";
// import { DotsVerticalIcon } from "@heroicons/react/24/outline";
import yarsa_cube from "~/images/yarsa-cube-grey.svg";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { LinksFunction } from "@remix-run/node";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { Fragment, useState } from "react";
import stylesheet from "~/styles/meeting.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div className="min-h-screen bg-black pt-12">
      <div
        className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6 rounded-lg"
        style={{
          maxWidth: "1000px",
          width: "100%",
          backgroundColor: "#1C1C1C",
          boxSizing: "border-box",
          border: "0.1px solid #e5e7eb",
        }}
      >
        <div className="flex flex-col md:flex-row sm:divide-x md:divide-gray-400">
          <section
            className="mt-12 md:mt-0 md:mr-3 pt-5"
            style={{
              maxWidth: "250px",
              width: "100%",
              backgroundColor: "#1C1C1C",
            }}
          >
            <img
              src={yarsa_cube}
              alt="yarsa_logo"
              style={{ width: "22px", height: "22px", marginBottom: "0.5rem" }}
            />
            <p className="text-subtle text-sm font-semibold text-white">
              Yarsa Labs
            </p>
            <h1 className="text-text text-xl font-semibold my-2 text-white">
              30 Min Meeting
            </h1>
            <div className="flex items-start justify-start text-sm text-text">
              <div className="relative z-10 mb-8 break-words max-w-full max-h-[180px] scroll-bar pr-4">
                <div>
                  <p className="text-white">A 30 minutes meeting.</p>
                </div>
              </div>
            </div>
            <p className="text-white flex flex-row text-sm font-semibold">
              <AiOutlineClockCircle size={20} className="mr-2 mt-0.5" />
              30 mins
            </p>
            <p className="text-white flex flex-row text-sm font-semibold mt-4">
              <CiLocationOn size={20} className="mr-2 mt-0.5" />2 location
              options
            </p>
          </section>
          <div
            className="md:pr-4 md:pl-4 pt-5 pb-3"
            style={{
              maxWidth: "430px",
              width: "100%",
              backgroundColor: "#1C1C1C",
            }}
          >
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-white">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-white">
              <div>SUN</div>
              <div>MON</div>
              <div>TUE</div>
              <div>WED</div>
              <div>THU</div>
              <div>FRI</div>
              <div>SAT</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "px-0"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-white",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-white",
                      isEqual(day, selectedDay) &&
                        isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-black",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      isEqual(day, selectedDay) && isToday(day) && "bg-white",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-white text-black",
                      !isEqual(day, selectedDay) &&
                        "button-background hover:bg-white",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-12 w-12 items-center justify-center rounded-lg"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>

                  <div className="w-1 h-1 mx-auto mt-1"></div>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-5 pt-5 pb-5">
            <h2 className="font-semibold text-white">
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "eee dd")}
              </time>

            </h2>
            <button type="button" className="text-white hover:text-white border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Default</button>

          </section>
        </div>
      </div>
    </div>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
