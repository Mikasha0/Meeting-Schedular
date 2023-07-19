import {
  ActionArgs,
  LinksFunction,
  LoaderArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  parse,
  startOfToday,
  startOfTomorrow,
  isSaturday,
  isSunday,
  addDays,
  setDay
} from "date-fns";
import { useState } from "react";
import Calendar from "~/component/Calendar";
import MeetingDetails from "~/component/MeetingDetails";
import MeetingForm from "~/component/MeetingForm";
import MeetingTimes from "~/component/MeetingTimes";
import stylesheet from "~/styles/meeting.css";
import {
  ACCEPTED_TIME,
  CreateMeetingDto,
  MeetingIdReSchedule,
  Weekday,
  colStartClasses,
  meetingSchema,
  meetingSchemaObj,
} from "~/types/z.schema";
import { getMeetingFormData } from "~/utils/formUtils";
import { badRequest } from "~/utils/request.server";
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
  // const formattedDate = new Date(date).toLocaleDateString("en-US", {
  //   timeZone: "Asia/Kathmandu",
  //   weekday: "long",
  //   month: "long",
  //   day: "numeric",
  //   year: "numeric",
  // });
  
  
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
    const oldTime = data.time;
    const oldDate = data.date
    console.log(oldDate);
    const newTime = url.searchParams.get("time");
    const newDate = url.searchParams.get("date");
    console.log(oldTime)
    console.log(data);
    console.log(data.notes);
    return { ...data, newFormattedDate, oldTime, newTime, oldDate,newDate};
  }
  console.log(time);
  return json({ date, time });
};

export async function action(args: ActionArgs) {
  const formData = await args.request.clone().formData()
  const _action = formData.get("_action")
  if (_action === "CREATE") {
    return createMeetingAction(args)
  }
  if (_action === "RESCHEDULE") {
    return rescheduleMeetingAction(args)
  }
  throw new Error("Unknown action")
}

export const rescheduleMeetingAction = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const { name, email, location, notes, guests,reason } = getMeetingFormData(form);
  console.log(form.entries);
  const params = new URLSearchParams(request.url.split("?")[1]);
  const time = params.get("time");
  const date = params.get("date");
  const reschedule = params.get("reschedule");
  console.log(reschedule);
  const parseResult = MeetingIdReSchedule.safeParse({
    time,
    email,
    date,
    name,
    location,
    notes: notes === "" ? null : notes,
    guests,
    reason
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

  const API_URL = `http://localhost:3333/api/meeting/${reschedule}`;

  try {
    const response = await fetch(API_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parseResult.data),
    });
    const data = await response.json();
    console.log(data);
    console.log(data.reason);

    return redirect(`/booking/?bookingId=${data.id}/&reason=${data.reason}`);
    
  } catch (error) {
    console.log("API request error:", error);
    return new Response("API request error", { status: 500 });
  }
}


export const createMeetingAction = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const { name, email, location, notes, guests,reason } = getMeetingFormData(form);
  console.log(notes)
  console.log(form.entries);
  const params = new URLSearchParams(request.url.split("?")[1]);
  const time = params.get("time");
  const date = params.get("date");
  console.log(date)
  const reschedule = params.get("reschedule");
  console.log(reschedule);
  const parseResult = meetingSchema.safeParse({
    time,
    email,
    date,
    name,
    location,
    notes: notes === "" ? null : notes,
    guests,
    reason
  });
  
  if (!parseResult.success) {
    const fieldErrors = parseResult.error.format();
    console.log(JSON.stringify(fieldErrors._errors[1]));

    return badRequest({
      fieldErrors,
      fields: null,
      formError: "Form not submitted correctly",
    });
  }
  const API_URL = "http://localhost:3333/api/meeting";
  console.log(date)

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parseResult.data),
    });
    console.log(parseResult.data)
    const data = await response.json();
    console.log(meetingSchema)
    console.log(data);
    console.log(data.notes);

    return redirect(`/booking/?bookingId=${data.id}`);
  } catch (error) {
    console.log("API request error:", error);
    return new Response("API request error", { status: 500 });
  }
};

export default function Meeting() {
  const navigate = useNavigate();
  const today = startOfToday();
  
  
const tomorrow = getNextBusinessDay();

function getNextBusinessDay() {
  const tomorrow = startOfTomorrow();

  if (isSaturday(tomorrow) || isSunday(tomorrow)) {
    const nextMonday = setDay(addDays(tomorrow, 2), 1); // Set to Monday (1 is Monday, 0 is Sunday)
    return nextMonday;
  } else {
    return tomorrow;
  }
}
  console.log(tomorrow);
  const data: CreateMeetingDto = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const timeValues = Object.values(ACCEPTED_TIME);
  const [selectedDay, setSelectedDay] = useState(tomorrow);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [selectedLocation, setSelectedLocation] = useState("Yarsa Meet");
  const [visible, setVisible] = useState(false);
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const days = eachDayOfInterval({
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

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          <MeetingDetails data={data} visible={visible} />
          {!visible && (
            <Calendar
              firstDayCurrentMonth={firstDayCurrentMonth}
              previousMonth={previousMonth}
              nextMonth={nextMonth}
              Weekday={Weekday}
              days={days}
              getDay={getDay}
              classNames={classNames}
              colStartClasses={colStartClasses}
              setSelectedDay={setSelectedDay}
              selectedDay={selectedDay}
            />
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
              toggleVisibility={toggleVisibility}
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

