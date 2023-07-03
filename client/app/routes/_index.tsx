import type { LinksFunction } from "@remix-run/node";
import yarsa_cube from "~/images/yarsa-cube-grey.svg";
import stylesheet from "~/styles/index.css";
import { useActionData, useNavigate } from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function index() {
  let navigate = useNavigate();
  const handleClick = (e: any) => {
    navigate('/meeting');
  };
  return (
    <>
      <main className="min-h-screen bg-black flex flex-col items-center">
        <div className="text-white" style={{ marginTop: "7rem" }}>
          <div
            className="logo-container "
            style={{
              width: "6rem",
              height: "6rem",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 0 10px rgba(0.9, 0.9, 0.9, 0.9)",
              backgroundColor: "#2b2b2b",
            }}
          >
            <img
              src={yarsa_cube}
              alt="yarsa_logo"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div className="font-col text-emphasis text-3xl mb-1 font-bold">
          Yarsa Labs
        </div>
        <p className="text-gray-500 text-subtle">
          Book your time at our Pokhara or Kathmandu offices.
        </p>

        <div
          className=" rounded-lg shadow-lg p-4 mt-7 hover:bg-gray-900"
          style={{
            maxWidth: "700px",
            width: "100%",
            backgroundColor: "#1C1C1C",
          }}
          onClick={handleClick}
        >
          <h2 className="text-sm font-semibold pr-2 text-emphasis mt-2">
            30 Min Meeting
          </h2>
          <p className="text-sm pr-2 text-subtle mt-3">A 30 minutes meeting.</p>

          <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 mb-2">
            <li>
              <div
                className="font-medium inline-flex items-center justify-center rounded gap-x-1 bg-subtle text-emphasis py-1 px-1.5 text-xs leading-3 text-white"
                style={{ backgroundColor: "#2b2b2b" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
    </>
  );
}
