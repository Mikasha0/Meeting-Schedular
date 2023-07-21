import { useState } from "react";
import { GoPersonAdd } from "react-icons/go";
import { BsPerson } from "react-icons/bs";
import { AddGuestsProps } from "~/types/add-guest.types";
import MultipleGuestsInput from "./MultipleGuestsInput";

export default function AddGuest({
  setShowInput,
  showInput,
  actionData,
}: AddGuestsProps) {
  const [inputFields, setInputFields] = useState<{ id: string }[]>([]);

  const addInputField = () => {
    setInputFields([
      ...inputFields,
      { id: `email-input-${inputFields.length}` },
    ]);
  };

  return (
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
            </div>
          </div>

         <MultipleGuestsInput inputFields={inputFields} addInputField={addInputField}/>

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
          {actionData?.fieldErrors?._errors ? (
            <p
              className="form-validation-error"
              style={{ color: "red" }}
              role="alert"
              id="name-error"
            >
              {actionData.fieldErrors._errors[0]}
            </p>
          ) : null}
        </>
      )}
    </>
  );
}
