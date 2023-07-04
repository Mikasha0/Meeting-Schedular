import { useNavigate } from "@remix-run/react";

const ErrorComponent = () => {
  let navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-600">
          We apologize for the inconvenience. Please try again later.
        </p>
        <button
          onClick={() => navigate("/meeting")}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
