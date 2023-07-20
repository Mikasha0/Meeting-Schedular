import yarsa_cube from "~/images/yarsa-cube-grey.svg";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { BsCalendarDate } from "react-icons/bs";
import { format, parseISO, addMinutes } from "date-fns";
import { MeetingDetailsProp } from "~/types/meeting-details.types";
import stylesheet from "~/styles/meeting.css";
import { LinksFunction } from "@remix-run/node";
const { getIncreasedTime } = require("~/utils/increasedDate");

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function MeetingDetails({ data, visible }: MeetingDetailsProp) {
  const originalTime = data.time;
  const newTime = data.newTime;

  const increasedOriginalTime = getIncreasedTime(originalTime);
  const increasedNewTime = getIncreasedTime(newTime);

  return (
    <section className="px-4 md:px-7 sm:px-6 mt-12 md:mt-0 md:mr-3 pt-5 meet-det-dimension">
      <a href="/">
        <img
          src={yarsa_cube}
          alt="meeting-details-yarsa-logo"
          className="meeting-details-yarsa-logo"
        />
      </a>

      <p className=" text-sm font-semibold text-gray-500">Yarsa Labs</p>
      <h1 className=" text-xl font-semibold my-2 text-black">
        Schedule Meeting
      </h1>
      <div className="flex items-start justify-start text-sm">
        <div className="relative z-10 mb-8 break-words max-w-full max-h-[180px] scroll-bar pr-4">
          <div>
            <p className="text-[#6b7280]">A 30 minutes meeting.</p>
          </div>
        </div>
      </div>
      {data.oldTime ? (
        <div className="relative z-10 max-w-full break-words mb-3 text-sm flex line-cut">
          <AiOutlineCalendar size={18} className="mr-2 " />{" "}
          {format(new Date(data.oldDate), "EEE, MMMM d, yyyy")}
          <br />
          {data.oldTime} -{increasedOriginalTime}
        </div>
      ) : (
        ""
      )}

      {visible && (
        <div className="relative z-10 max-w-full break-words mb-3 text-sm flex">
          <AiOutlineCalendar size={18} className="mr-2 " />{" "}
          {format(
            new Date(data.id ? data.newDate : data.date),
            "EEE, MMMM d, yyyy"
          )}
          <br />
          {data.id ? data.newTime : data.time} -{" "}
          {data.id ? increasedNewTime : increasedOriginalTime}
        </div>
      )}

      <p className="text-black flex flex-row text-sm ">
        <AiOutlineClockCircle size={20} className="mr-2 mt-0.5" />
        30 mins
      </p>
      <p className="text-black flex flex-row text-sm  mt-4">
        <CiLocationOn size={20} className="mr-2 mt-0.5" />2 location options
      </p>
    </section>
  );
}
