import { useNavigate } from "@remix-run/react";
import { BsCheckCircleFill } from "react-icons/bs";

export default function Booking({ data }: any) {
  const navigate = useNavigate();

  const handleNavigateToMeeting = (id: any) => {
    navigate(`/meeting/?reschedule=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto sm:p-6 md:max-w-4xl md:p-8 rounded-lg border border-gray-300 bg-white"
      style={{
        maxWidth: "550px",
        backgroundColor: "#fff",
        fontFamily: "Noto Sans, sans-serif", 

      }}>
        {data.map((datas: any) => (
          <div key={datas.id}>
            <div className="mx-auto flex justify-center">
              <BsCheckCircleFill className="text-green-500" size={40} />
            </div>
            <h3 className="text-2xl font-semibold leading-6 text-center mt-5">
              This meeting is scheduled
            </h3>

            <div className="mt-6">
              <p className="text-center text-gray-600">
                We emailed you and the other attendees a calendar invitation
                with all the details.
              </p>
            </div>
            <div className="mt-8 border-t border-gray-300 pt-8 text-left">
              <div className="font-semibold">What</div>
              <div className="col-span-2 mt-2 mb-6 text-gray-800">
                30 Min Meeting between Yarsa Labs and {datas.name}
              </div>
              <div className="font-semibold">When</div>
              <div className="col-span-2 mt-2 mb-6 text-gray-800">
                <div key={datas.id}>
                  {datas.date}
                  <br />
                  12:00 AM - 12:30 AM
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
              <div className="col-span-2 mt-2 text-gray-800">
                {datas.location}
              </div>
            </div>
            <hr className="mt-7" />
            <p className="text-default mt-7 text-center">
              Need to make a change?{" "}
              <button
                className="underline text-blue-500 mr-2"
                onClick={() => handleNavigateToMeeting(datas.id)}
              >
                Reschedule
              </button>
              or
              <a
                href="#cancel"
                className="underline text-blue-500 ml-2"
              >
                Cancel
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}



