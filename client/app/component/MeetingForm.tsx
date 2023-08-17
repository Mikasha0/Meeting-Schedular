import { useState } from "react";
import { Form } from "@remix-run/react";
import RadioButtons from "./RadioButtons";
import { MeetingFormProps } from "~/types/meeting-form.types";
import AddGuest from "./AddGuest";
import ActionButton from "./ActionButton";
import FormInput from "./FormInput";
import NormalButton from "./NormalButton";
import { btnTypes } from "~/types/z.schema";

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
          <FormInput
            lblName="Your name *"
            name="name"
            type="text"
            actionData={actionData}
            data={data}
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
          <FormInput
            lblName="Email address *"
            name="email"
            type="text"
            actionData={actionData}
            data={data}
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
            className="input-size block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <NormalButton btnName="Back" type={btnTypes.button} onClick={toggleVisibility}/>
            {!data.id ? (
              <ActionButton btnName="Confirm" value="CREATE" />
            ) : (
              <ActionButton btnName="Reschedule" value="RESCHEDULE" />
            )}
          </div>
        </div>
      </Form>
    </section>
  );
}
