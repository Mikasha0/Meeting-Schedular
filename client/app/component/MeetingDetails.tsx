import yarsa_cube from "~/images/yarsa-cube-grey.svg";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { BsCalendarDate } from "react-icons/bs";
import { format, parseISO, addMinutes } from "date-fns";
import { MeetingDetailsProp } from "~/types/meeting-details.types";
import stylesheet from "~/styles/meeting.css";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function MeetingDetails({ data, visible }: MeetingDetailsProp) {
  const originalTime = data.time;
  let increasedTime = '';
  
  if (originalTime !== null && originalTime !== undefined) {
    const [hours, minutes] = originalTime.split(':');
    const newTime = addMinutes(new Date(0, 0, 0, parseInt(hours), parseInt(minutes)), 30);
    increasedTime = format(newTime, 'HH:mm');
  }
  
  return (
    <section
      className="mt-12 md:mt-0 md:mr-3 pt-5 meet-det-dimension"
    >
      <img
        src={yarsa_cube}
        alt="meeting-details-yarsa-logo"
        className="meeting-details-yarsa-logo"
      />
      <p className=" text-sm font-semibold text-gray-500">
        Yarsa Labs
      </p>
      <h1 className=" text-xl font-semibold my-2 text-black">
        30 Min Meeting
      </h1>
      <div className="flex items-start justify-start text-sm">
        <div className="relative z-10 mb-8 break-words max-w-full max-h-[180px] scroll-bar pr-4">
          <div>
            <p className="text-[#6b7280]">A 30 minutes meeting.</p>
          </div>
        </div>
      </div>
      {data.start ? (
        <div className="relative z-10 max-w-full break-words mb-3 text-sm flex line-cut">
          <BsCalendarDate size={18} className="mr-2 " />{" "}
          {format(parseISO(data.start), "EEE, MMMM d, yyyy")}
          <br />
          {data.time} - {addMinutes(data.time, 30)}
        </div>
      ) : (
        ""
      )}

      {visible && (
        <div className="relative z-10 max-w-full break-words mb-3 text-sm flex">
          <BsCalendarDate size={18} className="mr-2 " />{" "}
          {data.newFormattedDate ? data.newFormattedDate : data.formattedDate}
          <br />
          {data.time} - {increasedTime}
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
