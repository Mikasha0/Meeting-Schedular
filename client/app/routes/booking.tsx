import { LinksFunction, LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BsCheckCircleFill } from "react-icons/bs";
import stylesheet from "~/styles/meeting.css";
import { useNavigate } from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader = async() =>{

  return json([{
    id:"123445",
    name : "Aniket Tamrakar", 
    date : "Wednesday, July 5, 2023",
    email: "anikettamrakar0@gmail.com",
    location:"Yarsa Labs Office"
  }])
}

export default function booking() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const handleNavigateToMeeting = (id:any) =>{
    navigate(`/meeting/?reschedule=${id}`);
  }
 
  return (
    <div className="min-h-screen bg-[#f3f4f6] pt-8 mb-3">
      <div
        className={`max-w-md p-8 mx-auto sm:px-7 md:max-w-4xl md:px-6 rounded-lg border border-gray-300 `}
        style={{
          maxWidth: "550px",
          backgroundColor: "#fff",
        }}
      >{data.map((datas)=>(
        <>
        <div className=" mx-auto flex justify-center">
        <BsCheckCircleFill style={{ fill: "green" }} size={40} />
      </div>
      <h3 className="text-2xl font-semibold leading-6 text-center mt-5">
        This meeting is scheduled
      </h3>

      <div className="mt-3">
        <p className="text-center">
          We emailed you and the other attendees a calendar invitation with
          all the details.
        </p>
      </div>
      <div className=" mt-8 grid grid-cols-3 border-t pt-8 text-left">
        <div className="font-semibold">What</div>
        <div className="col-span-2 mb-6 last:mb-0" key={datas.name}>
          30 Min Meeting between Yarsa Labs and {datas.name}
        </div>
        <div className="font-semibold">When</div>
        <div className="col-span-2 mb-6 last:mb-0">
          <div>
            {datas.date}
            <br />
            12:00 AM - 12:30 AM{" "}
            {/* <span className="text-bookinglight">(Pacific Daylight Time)</span> */}
          </div>
        </div>
        <div className="font-semibold">Who</div>
        <div className="col-span-2 last:mb-0">
          <div className="mb-3">
            <div>
              <span className="mr-2">Yarsa Labs</span>
              <div className="font-medium inline-flex items-center justify-center rounded gap-x-1 bg-info text-info py-1 px-1.5 text-xs leading-3">
                Host
              </div>
            </div>
            <p className="text-default">sub.cal.com@yarsa.io</p>
          </div>
          <div className="mb-3 last:mb-0">
            <p data-testid="attendee-name-Aniket Tamrakar">Aniket Tamrakar</p>
            <p data-testid="attendee-email-anikettamrakar0@gmail.com">
              {datas.email}
            </p>
          </div>
        </div>
        <div className="mt-3 font-semibold">Where</div>
        <div className="col-span-2 mt-3">{datas.location}</div>
      </div>
      <hr className="mt-7" />
      <p className="text-default mt-7 text-center">
        Need to make a change?{" "}
        <button
          className="underline"
          style={{ marginRight: "5px" }}
          onClick={() => handleNavigateToMeeting(datas.id)}        >
          Reschedule
        </button>
        or
        <a href="#cancel" className="underline" style={{ marginLeft: "5px" }}>
          Cancel
        </a>
      </p>
      </>
      ))}
       
      </div>
    </div>
  );
}
