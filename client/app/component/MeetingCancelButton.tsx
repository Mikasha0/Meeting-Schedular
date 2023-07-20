import { Form } from "@remix-run/react";
import { MeetingCancelButtonProps } from "~/types/meeting-cancel-button.types";

export default function MeetingCancelButton({
  setShowCancelField,
  showCancelField,
}: MeetingCancelButtonProps) {
  return (
    <>
      <button
        className="underline text-black mr-2"
        onClick={() => setShowCancelField(!showCancelField)}
      >
        Cancel
      </button>
      {showCancelField ? (
        <>
        <Form method="post">
          <textarea
            id="message"
            name="cancel"
            className="block p-2.5 mt-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please give a reason as to why u want to cancel this meeting"
          ></textarea>
          <div className="text-right mt-3">
            <button
              type="submit"
              value="RESCHEDULE"
              className="text-white bg-orange-400 border border-gray-300 focus:outline-none hover:bg-orange-500 hover:text-white focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-white dark:text-black dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Cancel Meeting
            </button>
          </div>
          </Form>
        </>
      ) : (
        ""
      )}
    </>
  );
}
