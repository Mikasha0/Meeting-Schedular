import { useState } from "react";
import { GoPersonAdd } from "react-icons/go";
import { Form } from "@remix-run/react";
import { EventActions } from "~/types/z.schema";
import RadioButtons from "./RadioButtons";
import { MeetingFormProps } from "~/types/meeting-form.types";

export default function MeetingForm({
  toggleVisibility,
  actionData,
  data,
  handleRadioChange,
  selectedLocation,
}: MeetingFormProps) {
  const [showInput, setShowInput] = useState(false);
  const getEvent = () => {
    return data.id ? EventActions.CREATE : EventActions.RESCHEDULE;
  };
  return (
    <section className="mt-12 md:mt-0 md:pl-6 pt-5 pb-5">
      <Form method="post">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name *
          </label>
          <input
            type="text"
            name="name"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            style={{ width: "370px" }}
            defaultValue={actionData?.fields?.name || data.name}
            readOnly={data.name ? true : false}
            required
          />
          {actionData?.fieldErrors?.name ? (
            <p
              className="form-validation-error"
              style={{ color: "red" }}
              role="alert"
              id="name-error"
            >
              {actionData.fieldErrors.name._errors[0]}
            </p>
          ) : null}
          <label
            htmlFor="first_name"
            className="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address *
          </label>
          <input
            type="text"
            name="email"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={actionData?.fields?.email || data.email}
            readOnly={data.email ? true : false}
            required
          />
          {actionData?.fieldErrors?.email ? (
            <p
              className="form-validation-error"
              style={{ color: "red" }}
              role="alert"
              id="name-error"
            >
              {actionData.fieldErrors.email._errors[0]}
            </p>
          ) : null}
          <RadioButtons
            handleRadioChange={handleRadioChange}
            selectedLocation={selectedLocation}
          />
          <label className="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {data.id ? "Reason For Reschedule" : "Additional notes"}
          </label>
          <textarea
            id="message"
            name={getEvent()}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please share anything that will help prepare for our meeting"
          ></textarea>
          {!data.id ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setShowInput(!showInput);
                }}
                className="text-black mt-3 bg-white hover:bg-[#e5e4e6]/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
              >
                <GoPersonAdd size={18} className="mr-3 mt-0.5" />
                Add guests
              </button>
              {showInput && (
                <>
                  <div className="flex items-center">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        name="guest-email"
                        id="email-input"
                        className="block  p-2 pr-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        style={{ width: "370px" }}
                        defaultValue={actionData?.fields?.guests}
                        placeholder="E-mail"
                      />

                      <button className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 focus:outline-none">
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
                  {actionData?.fieldErrors?.guests ? (
                    <p
                      className="form-validation-error"
                      style={{ color: "red" }}
                      role="alert"
                      id="name-error"
                    >
                      {actionData.fieldErrors.guests[0]._errors[0]}
                    </p>
                  ) : null}
                </>
              )}
            </>
          ) : (
            ""
          )}
          <div className="text-right ">
            <button
              type="button"
              onClick={toggleVisibility}
              className="text-white mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Back
            </button>
            <button
              type="submit"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-400 hover:text-white focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-white dark:text-black dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              {data.id ? "Reschedule" : "Confirm"}
            </button>
          </div>
        </div>
      </Form>
    </section>
  );
}
