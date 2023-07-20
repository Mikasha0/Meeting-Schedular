import { RadioButtonsProp } from "~/types/radio-buttons.types";

export default function RadioButtons({
  handleRadioChange,
  selectedLocation,
}: RadioButtonsProp) {
  return (
    <>
      <label className="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Location *
      </label>
      <div className="flex items-center mb-2">
        <input
          type="radio"
          id="Video_Call"
          name="location"
          value="Yarsa Meet"
          className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
          onChange={handleRadioChange}
          checked={selectedLocation === "Yarsa Meet"}
        />
        <label
          htmlFor="Video_Call"
          className="block ml-2 text-sm text-gray-600 "
        >
          Video Call (Yarsa Meet)
        </label>
      </div>
      <div className="flex items-center mb-2">
        <input
          type="radio"
          id="YLO_Kathmandu"
          name="location"
          value="Yarsa Labs Office, Kathmandu"
          className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
          onChange={handleRadioChange}
          checked={selectedLocation === "Yarsa Labs Office, Kathmandu"}
        />
        <label
          htmlFor="YLO_Kathmandu"
          className="block ml-2 text-sm text-gray-600"
        >
          Yarsa Labs, Kathmandu (Office Visit)
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="radio"
          id="YLO_Pokhara"
          name="location"
          value="Yarsa Labs Office, Pokhara"
          className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
          onChange={handleRadioChange}
          checked={selectedLocation === "Yarsa Labs Office, Pokhara"}
        />
        <label
          htmlFor="YLO_Pokhara"
          className="block ml-2 text-sm text-gray-600"
        >
          Yarsa Labs, Pokhara (Office Visit)
        </label>
      </div>
    </>
  );
}
