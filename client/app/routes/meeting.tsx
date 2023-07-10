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
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const rescheduleId = url.searchParams.get("reschedule");

  if (rescheduleId) {
    const res = await fetch(
      `http://localhost:3333/api/meeting/${rescheduleId}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  }

  const time = url.searchParams.get("time");
  const date = url.searchParams.get("date") ?? new Date();
  console.log(time);
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return json({ formattedDate, time });
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  console.log(form);
  const { name, email, location, notes, guests } = getMeetingFormData(form);
  console.log(name, email, location, notes, guests);
  const params = new URLSearchParams(request.url.split("?")[1]);
  const time = params.get("time");
  const date = params.get("date");
  console.log(date);
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
    console.log(fieldErrors);
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
    return redirect(`/booking/?bookingId=${data.id}`);
  } catch (error) {
    // Handle any exceptions during the API request
    console.log("API request error:", error);
    return new Response("API request error", { status: 500 });
  }
};

export default function Meeting() {
  const [showInput, setShowInput] = useState(false);

  let navigate = useNavigate();
  let today = startOfToday();
  const data = useLoaderData<typeof loader>();
  console.log(data);
  const actionData = useActionData<typeof action>();
  const timeValues = Object.values(ACCEPTED_TIME);
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
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

  return (
    <div className="min-h-screen bg-[#f3f4f6] pt-8">
      <div
        className={`max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6 rounded-lg  ${
          visible === true ? "default-width" : "toggled-width"
        }`}
      >
        <div className="flex flex-col md:flex-row sm:divide-x ">
          <section
            className="mt-12 md:mt-0 md:mr-3 pt-5"
            style={{
              maxWidth: "250px",
              width: "100%",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={yarsa_cube}
              alt="yarsa_logo"
              style={{ width: "22px", height: "22px", marginBottom: "0.5rem" }}
            />
            <p className="text-subtle text-sm font-semibold text-black">
              Yarsa Labs
            </p>
            <h1 className="text-text text-xl font-semibold my-2 text-black">
              30 Min Meeting
            </h1>
            <div className="flex items-start justify-start text-sm text-text">
              <div className="relative z-10 mb-8 break-words max-w-full max-h-[180px] scroll-bar pr-4">
                <div>
                  <p className="text-black">A 30 minutes meeting.</p>
                </div>
              </div>
            </div>
            {data.start
              ? format(parseISO(data.start), "EEEE, MMMM d, yyyy")
              : ""}
            {}
            {visible && (
              <div className="relative z-10 max-w-full break-words mb-3 text-sm">
                {data.formattedDate}
                <br />
                {data.time}
                {/* 12:00am – 12:30am */}
              </div>
            )}

            <p className="text-black flex flex-row text-sm ">
              <AiOutlineClockCircle size={20} className="mr-2 mt-0.5" />
              30 mins
            </p>
            <p className="text-black flex flex-row text-sm  mt-4">
              <CiLocationOn size={20} className="mr-2 mt-0.5" />2 location
              options
            </p>
          </section>
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
              <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-black">
                {Object.values(Weekday).map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 mt-2 text-sm">
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
            <section className="mt-12 md:mt-0 md:pl-8 pt-5 pb-5">
              <h2 className="font-semibold text-black">
                <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                  {format(selectedDay, "eee dd")}
                </time>
              </h2>
              {timeValues.map((time) => (
                <button
                  key={time}
                  type="button"
                  className="text-black hover:text-white border border-gray-300 hover:bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-0 mt-3"
                  style={{ width: "235px" }}
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
                        `/meeting/?${data.id}/&time=${time}&date=${date}`
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
            </section>
          )}
          {visible && (
            <section className="mt-12 md:mt-0 md:pl-6 pt-5 pb-5">
              <Form method="post">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    style={{ width: "370px" }}
                    defaultValue={actionData?.fields?.name || data.name}
                    readOnly={!data.name}
                    required
                  />
                  {actionData?.fieldErrors?.name ? (
                    <p
                      className="form-validation-error"
                      style={{ color: "red" }}
                      role="alert"
                      id="name-error"
                    >
                      {actionData.fieldErrors.name._errors[0]}
                    </p>
                  ) : null}
                  <label
                    htmlFor="first_name"
                    className="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email address *
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="small-input"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={actionData?.fields?.email || data.email}
                    readOnly={!data.name}

                    required
                  />
                  {actionData?.fieldErrors?.email ? (
                    <p
                      className="form-validation-error"
                      style={{ color: "red" }}
                      role="alert"
                      id="name-error"
                    >
                      {actionData.fieldErrors.email._errors[0]}
                    </p>
                  ) : null}
                  <label
                    htmlFor="first_name"
                    className="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Location
                  </label>
                  <div className="flex items-center mb-2">
                    <input
                      id="country-option-1"
                      type="radio"
                      name="location"
                      value="Yarsa Meet"
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="country-option-1"
                      className="block ml-2 text-sm  text-gray-900 dark:text-gray-300"
                    >
                      Video Call (Virtual Meeting)
                    </label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      id="country-option-1"
                      type="radio"
                      name="location"
                      value="Yarsa Meet"
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="country-option-1"
                      className="block ml-2 text-sm text-gray-900 dark:text-gray-300"
                    >
                      YLO, Kathmandu (Physical Visit)
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      id="country-option-1"
                      type="radio"
                      name="location"
                      value="Yarsa Meet"
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="country-option-1"
                      className="block ml-2 text-sm text-gray-900 dark:text-gray-300"
                    >
                      YLO, Pokhara (Physical Visit)
                    </label>
                  </div>
                  <label
                    htmlFor="first_name"
                    className="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Additional notes
                  </label>
                  <textarea
                    id="message"
                    name="notes"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Please share anything that will help prepare for our meeting"
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => {
                      setShowInput(!showInput);
                    }}
                    className="text-black mt-3 bg-white hover:bg-[#e5e4e6]/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
                  >
                    <GoPersonAdd size={18} className="mr-3 mt-0.5" />
                    Add guests
                  </button>
                  {showInput && (
                    <div className="flex items-center">
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          name="guest-email"
                          id="email-input"
                          className="block  p-2 pr-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          style={{ width: "370px" }}
                          placeholder="E-mail"
                        />
                        <button className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 focus:outline-none">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="text-right mt-4">
                    <button
                      type="button"
                      onClick={handleClick}
                      className="text-white mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-400 hover:text-white focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-white dark:text-black dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </Form>
            </section>
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
