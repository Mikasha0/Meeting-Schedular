import yarsa_cube from "~/images/yarsa-cube-grey.svg";

export default function index() {
  return (
    <>
      <main className="min-h-screen bg-black flex flex-col justify-center items-center">
        <div className="text-white">
          <img
            src={yarsa_cube}
            alt="yarsa_logo"
            style={{ width: "6rem", height: "6rem" }}
          />
        </div>
        <div className="font-col text-white text-3xl mb-1">Yarsa Labs</div>
        <span className="text-gray-500 font-medium">
          Book your time at our Pokhara or Kathmandu offices.
        </span>
      </main>
    </>
  );
}
