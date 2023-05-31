import { useState } from "react";
import Calendar from "react-calendar";

export default function Meeting() {
  const [value, onChange] = useState(new Date());
  return (
    // <div style={{ width: "40%", height: "40%" }}>
    // </div>
    <main className="calendar min-h-screen bg-black flex items-center justify-center">
      <Calendar
        className="text-white bg-gray-900 p-4 rounded-lg shadow-lg"
        value={value}
      />
    </main>
  );
}
