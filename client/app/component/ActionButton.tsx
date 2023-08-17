interface ActionButtonType{
    btnName:string,
    value:string

}
export default function ActionButton({btnName, value }:ActionButtonType) {
  return (
    <button
      type="submit"
      name="_action"
      value={value}
      className="text-white mt-4 bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    >
      {btnName}
    </button>
  );
}
