import type { LinksFunction } from "@remix-run/node";
import yarsa_cube from "~/images/yarsa-cube-grey.svg";
import stylesheet from "~/styles/index.css";
import { useNavigate } from "@remix-run/react";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function index() {
  let navigate = useNavigate();
  return (
    <main className="min-h-screen  flex flex-col items-center bg-[#f3f4f6]">
      <div className="text-white mt-28 ">
        <a href="/" className="block">
          <img
            src={yarsa_cube}
            alt="yarsa-logo-img"
            className="yarsa-logo-img"
          />
        </a>
      </div>
      <div className="font-col text-emphasis text-3xl mb-1 font-bold">
        Yarsa Labs
      </div>
      <p className="text-gray-500 text-subtle text-sm w-[60%] text-center ">
        Book your time at our Pokhara or Kathmandu offices.
      </p>
      <div
        className="rounded-lg shadow-lg p-4 mt-7 bg-white hover:bg-gray-200 cursor-pointer w-[80%] md:w-[60%]"
        onClick={() => navigate("/meeting")}
      >
        <h2 className="text-sm font-semibold pr-2 text-emphasis mt-2">
          30 Min Meeting
        </h2>
        <p className="text-sm pr-2 text-subtle mt-3">A 30 minutes meeting.</p>
        <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 mb-2">
          <li>
          <div className="font-medium inline-flex items-center justify-center rounded gap-x-1 bg-subtle text-emphasis py-1 px-1.5 text-xs leading-3 text-white cursor-pointer hover:bg-opacity-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="black"
                stroke="currentColor"
                className="h-3 w-3 stroke-[3px] text-white"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              30m
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
}
