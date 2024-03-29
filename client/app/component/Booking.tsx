import { useNavigate } from "@remix-run/react";
import { BsCheckCircleFill } from "react-icons/bs";
import { format } from "date-fns";
import { useState } from "react";
import MeetingCancelButton from "./MeetingCancelButton";

const { getIncreasedTime } = require("~/utils/increasedDate");

export default function Booking({ data }: any) {
  const navigate = useNavigate();
  const increasedTime = getIncreasedTime(data.time);
  const [showCancelField, setShowCancelField] = useState(false);


  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div
        className="max-w-md mx-auto sm:p-6 md:max-w-4xl md:p-8 rounded-lg border border-gray-300 bg-white"
        style={{
          maxWidth: "550px",
          backgroundColor: "#fff",
          fontFamily: "Noto Sans, sans-serif",
        }}
      >
        <div className="mx-auto flex justify-center">
          <BsCheckCircleFill className="text-green-500" size={40} />
        </div>
        <h3 className="text-2xl font-semibold leading-6 text-center mt-5">
          This meeting is scheduled
        </h3>

        <div className="mt-6">
          <p className="text-center text-gray-500">
            We emailed you and the other attendees a calendar invitation with
            all the details.
          </p>
        </div>
        <div className="mt-8 border-t border-gray-300 pt-8 text-left">
          <div className="font-semibold">What</div>
          <div className="col-span-2 mt-2 mb-6 text-gray-800">
            30 Min Meeting between Yarsa Labs and {data.name}
          </div>
          <div className="font-semibold">When</div>
          <div className="col-span-2 mt-2 mb-6 text-gray-800">
            <div key={data.id}>
              {format(new Date(data.newDate?data.newDate:data.date), "EEEE, MMMM d, yyyy")}
              <br />
              {data.time} - {increasedTime}
            </div>
          </div>
          <div className="font-semibold">Who</div>
          <div className="col-span-2 mt-2 mb-6 text-gray-800">
            <div>
              <span className="mr-2">Yarsa Labs</span>
              <div className="font-medium inline-flex items-center justify-center rounded bg-blue-500 text-white py-1 px-2 text-xs leading-3">
                Host
              </div>
            </div>
            <p className="text-default">sub.cal.com@yarsa.io</p>
          </div>
          <div className="mt-2 font-semibold">Where</div>
          <div className="col-span-2 mt-2 text-gray-800">{data.location}</div>
          {data.notes &&(
            <>
              <div className="mt-2 font-semibold">Notes</div>
              <div className="col-span-2 mt-2 text-gray-800">{data.notes}</div>
            </>
          )}

          {data.reason && (
            <>
              <div className="mt-2 font-semibold">Reason for Reschedule</div>
              <div className="col-span-2 mt-2 text-gray-800">{data.reason}</div>
            </>
          )}
        </div>
        <hr className="mt-7" />
        <div className="text-default mt-7 text-center">
          Need to make a change?{" "}
          <button
            className="underline text-black mr-2"
            onClick={() =>
              navigate(`/meeting/?reschedule=${data.id}/?time=${data.time}`)
            }
          >
            Reschedule
          </button>
          or{" "}
          <MeetingCancelButton
            showCancelField={showCancelField}
            setShowCancelField={setShowCancelField}
          />
        </div>
      </div>
    </div>
  );
}
