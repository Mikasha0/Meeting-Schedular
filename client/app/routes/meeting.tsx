import {
  ActionArgs,
  LinksFunction,
  LoaderArgs,
} from "@remix-run/node";
import { useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import {
  getDay
} from "date-fns";
import { useState } from "react";
import { createMeetingAction } from "~/actions/createMeeting";
import { rescheduleMeetingAction } from "~/actions/rescheduleMeeting";
import Calendar from "~/component/Calendar";
import MeetingDetails from "~/component/MeetingDetails";
import MeetingForm from "~/component/MeetingForm";
import MeetingTimes from "~/component/MeetingTimes";
import { loader as meetingLoader } from "~/loaders/getMeetings";
import stylesheet from "~/styles/meeting.css";
import {
  ACCEPTED_TIME,
  CreateMeetingDto,
  Weekday,
  colStartClasses
} from "~/types/z.schema";
import { useCurrentMonth } from "~/utils/CalendarUtils";
import { getNextBusinessDay } from "~/utils/nextBusinessDay";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export const loader = async (args:LoaderArgs)=> {
  return meetingLoader(args)
}

export async function action(args: ActionArgs) {
  const formData = await args.request.clone().formData();
  const _action = formData.get("_action");
  if (_action === "CREATE") {
    return createMeetingAction(args);
  }
  if (_action === "RESCHEDULE") {
    return rescheduleMeetingAction(args);
  }
  throw new Error("Unknown action");
}

export default function Meeting() {
  const navigate = useNavigate();
  const tomorrow = getNextBusinessDay();
  const data: CreateMeetingDto = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const timeValues = Object.values(ACCEPTED_TIME);
  const [selectedDay, setSelectedDay] = useState(tomorrow);
  const [visible, setVisible] = useState(false);
  const {
    firstDayCurrentMonth,
    days,
    previousMonth,
    nextMonth,
    handleRadioChange,
    selectedLocation
  } = useCurrentMonth();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] md:pt-8 md:pb-4">
      <div
        className={`max-w-md  mx-auto  md:max-w-4xl  rounded-lg ${
          visible === true ? "default-width" : "toggled-width"
        }`}
      >
        <div className="col flex flex-col md:flex-row md:divide-x">
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
