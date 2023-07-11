import yarsa_cube from "~/images/yarsa-cube-grey.svg";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";

export default function DateShow({ data, visible }: any) {
  return (
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
      <p className="text-subtle text-sm font-semibold text-black">Yarsa Labs</p>
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
        <CiLocationOn size={20} className="mr-2 mt-0.5" />2 location options
      </p>
    </section>
  );
}
