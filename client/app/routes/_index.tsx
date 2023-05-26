import yarsa_cube from "~/images/yarsa-cube-grey.svg";

export default function index() {
  return (
    <>
      <main className="min-h-screen bg-black flex flex-col items-center">
        <div className="text-white" style={{ marginTop: "8rem" }}>
          <img
            src={yarsa_cube}
            alt="yarsa_logo"
            style={{ width: "6rem", height: "6rem" }}
          />
        </div>
        <div className="font-col text-white text-3xl mb-1 font-bold">
          Yarsa Labs
        </div>
        <span className="text-gray-500 font-medium">
          Book your time at our Pokhara or Kathmandu offices.
        </span>

        <div
          className="bg-white rounded-lg shadow-lg p-4 mt-5" // Adjusted margin-top value
          style={{ width: "700px" }}
        >
          <h2 className="text-sm font-semibold pr-2">30 Min Meeting</h2>
          <h2 className="text-sm pr-2">A 30 minutes meeting.</h2>

          <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
            <li>
              <div className="font-medium inline-flex items-center justify-center rounded gap-x-1 bg-subtle text-emphasis py-1 px-1.5 text-xs leading-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2" // Corrected property name
                  strokeLinecap="round" // Corrected property name
                  strokeLinejoin="round" // Corrected property name
                  className="h-3 w-3 stroke-[3px]"
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
