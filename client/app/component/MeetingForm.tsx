import { useState } from "react";
import { Form } from "@remix-run/react";
import RadioButtons from "./RadioButtons";
import { MeetingFormProps } from "~/types/meeting-form.types";
import AddGuest from "./AddGuest";

export default function MeetingForm({
  toggleVisibility,
  actionData,
  data,
  handleRadioChange,
  selectedLocation,
}: MeetingFormProps) {
  const [showInput, setShowInput] = useState(false);
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
            name={data.id ? "reason" : "notes"}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please share anything that will help prepare for our meeting"
          ></textarea>
          {!data.id && (
            <AddGuest
              setShowInput={setShowInput}
              showInput={showInput}
              actionData={actionData}
            />
          )}
          <div className="flex justify-between ">
            <button
              type="button"
              onClick={toggleVisibility}
              className="text-gray-900 mt-4 bg-white border border-gray-300  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Back
            </button>
            {!data.id ? (
              <button
                type="submit"
                name="_action"
                value="CREATE"
                className="text-white mt-4 bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Confirm
              </button>
            ) : (
              <button
                type="submit"
                name="_action"
                value="RESCHEDULE"
                className="text-white mt-4 bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Reschedule
              </button>
            )}
          </div>
        </div>
      </Form>
    </section>
  );
}
