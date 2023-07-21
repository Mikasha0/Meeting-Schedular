import { BsPerson } from "react-icons/bs";

export default function MultipleGuestsInput({
  inputFields,
  addGuestInputField,
  removeGuestInputField
}: any) {
  return (
    <>
      {inputFields.map((field: any) => (
        <>
          <div className="flex items-center">
            <div className="relative flex items-center">
              <input
                key={field.id}
                type="text"
                name="guest-email"
                id={field.id}
                className="block mt-2 p-2 pr-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                style={{ width: "370px" }}
                placeholder="E-mail"
              />
              <button
                onClick={() => removeGuestInputField(field.id)}
                className="absolute top-6 right-2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </>
      ))}
      <div className="text-right">
        <button
          type="button"
          onClick={addGuestInputField}
          className="text-black mt-3 bg-white border border-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
        >
          <BsPerson size={18} className="mr-2 mt-0.5" /> Add
        </button>
      </div>
    </>
  );
}
