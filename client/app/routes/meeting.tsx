import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  ActionArgs,
  LinksFunction,
  LoaderArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  parseISO,
} from "date-fns";
import stylesheet from "~/styles/meeting.css";
import { useState } from "react";
import { GoPersonAdd } from "react-icons/go";
import { Form } from "@remix-run/react";
import MeetingForm from "~/component/MeetingForm";
import { getMeetingFormData } from "~/utils/formUtils";
import { useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { ACCEPTED_TIME, meetingSchema, Weekday } from "~/types/z.schema";
import { badRequest } from "~/utils/request.server";
import yarsa_cube from "~/images/yarsa-cube-grey.svg";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import DateShow from "~/component/DateShow";
import CalendarButton from "~/component/CalendarButton";
import { BsCalendarDate } from "react-icons/bs";
import MeetingTimes from "~/component/MeetingTimes";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const rescheduleId = url.searchParams.get("reschedule");
  const time = url.searchParams.get("time");
  const date = url.searchParams.get("date") ?? new Date();
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  if (rescheduleId) {
    const res = await fetch(
      `http://localhost:3333/api/meeting/${rescheduleId}`
    );
    const newFormattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const data = await res.json();
    return { ...data, newFormattedDate };
  }

  return json({ formattedDate, time });
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const { name, email, location, notes, guests } = getMeetingFormData(form);
  console.log(name, email, location);
  const params = new URLSearchParams(request.url.split("?")[1]);
  const time = params.get("time");
  const date = params.get("date");
  const parseResult = meetingSchema.safeParse({
    time,
    email,
    date,
    name,
    location,
    notes: notes === "" ? null : notes,
    guests,
  });

  if (!parseResult.success) {
    const fieldErrors = parseResult.error.format();
    console.log(JSON.stringify(fieldErrors));

    return badRequest({
      fieldErrors,
      fields: null,
      formError: "Form not submitted correctly",
    });
  }

  const API_URL = "http://localhost:3333/api/meeting";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parseResult.data),
    });

    const data = await response.json();
    console.log(data);

    return redirect(`/booking/?bookingId=${data.id}`);
  } catch (error) {
    // Handle any exceptions during the API request
    console.log("API request error:", error);
    return new Response("API request error", { status: 500 });
  }
};

export default function Meeting() {
  // const [showInput, setShowInput] = useState(false);

  let navigate = useNavigate();
  let today = startOfToday();
  const data = useLoaderData<typeof loader>();
  console.log(data);
  const actionData = useActionData<typeof action>();
  const timeValues = Object.values(ACCEPTED_TIME);
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [selectedLocation, setSelectedLocation] = useState("Yarsa Meet");

  const [visible, setVisible] = useState(false);

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

  const handleClick = () => {
    setVisible(!visible);
    console.log("first");
  };

  const handleRadioChange = (event: any) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] pt-8">
      <div
        className={`max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6 rounded-lg  ${
          visible === true ? "default-width" : "toggled-width"
        }`}
      >
        <div className="flex flex-col md:flex-row sm:divide-x ">
          <DateShow data={data} visible={visible} />
          {!visible && (
            <div
              className="md:pr-4 md:pl-4 pt-5 pb-3"
              style={{
                maxWidth: "480px",
                width: "100%",
                backgroundColor: "#fff",
              }}
            >
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
              <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                {Object.values(Weekday).map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 mt-2 text-sm font-medium">
                {days.map((day, dayIdx) => {
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
                        isEqual={isEqual}
                        isToday={isToday}
                        day={day}
                        selectedDay={selectedDay}
                        setSelectedDay={setSelectedDay}
                        firstDayCurrentMonth={firstDayCurrentMonth}
                        isSameMonth={isSameMonth}
                        isSaturday={isSaturday}
                        isSunday={isSunday}
                        format={format}
                        classNames={classNames}
                      />

                      <div className="w-1 h-1 mx-auto mt-0.5"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {!visible && (
            <MeetingTimes
              selectedDay={selectedDay}
              timeValues={timeValues}
              data={data}
              navigate={navigate}
              setVisible={setVisible}
              visible={visible}
            />
          )}
          {visible && (
            <MeetingForm
              handleClick={handleClick}
              actionData={actionData}
              data={data}
              handleRadioChange={handleRadioChange}
              selectedLocation={selectedLocation}
            />
          )}
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
