import { useState } from "react";
import Calendar from "react-calendar";

export default function Meeting() {
  const [value, onChange] = useState(new Date());
  return (
    <div style={{ width: "40%", height: "40%" }}>
      <Calendar value={value} />
    </div>
  );
}
