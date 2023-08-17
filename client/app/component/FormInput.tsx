import { CreateMeetingDto } from "~/types/z.schema";

interface FormInputType {
  lblName: string,
  name: string,
  type: string,
  actionData?: any,
  data: CreateMeetingDto,

}
export default function FormInput({
  lblName,
  name,
  type,
  data,
  actionData,
}: FormInputType) {
  return (
    <>
      <label
        htmlFor="first_name"
        className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {lblName}
      </label>
      <input
        type={type}
        name={name}
        className="input-size block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        defaultValue={actionData?.fields?.name || data.name}
        readOnly={!!data.name}
        required
      />
    </>
  );
}
