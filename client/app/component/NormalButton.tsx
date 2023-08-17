import { NormalButtonType } from "~/types/normal-button.types";

export default function NormalButton({btnName, type, ...inputProps}:NormalButtonType) {
  return (
    <button
      type={type}
      className="text-gray-900 mt-4 bg-white border border-gray-300  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      {...inputProps}
    >
      {btnName}
    </button>
  );
}
