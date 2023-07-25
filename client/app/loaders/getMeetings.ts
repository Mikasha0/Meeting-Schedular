import { LoaderArgs, LoaderFunction, json } from "@remix-run/node";

export const loader:LoaderFunction = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  console.log("ajfasdf")
  const rescheduleId = url.searchParams.get("reschedule");
  const time = url.searchParams.get("time");
  const date = url.searchParams.get("date") ?? new Date();

  if (rescheduleId) {
    const res = await fetch(
      `http://localhost:3333/api/meeting/${rescheduleId}`
    );
    const newFormattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const data = await res.json();
    const oldTime = data.time;
    const oldDate = data.date;
    const newTime = url.searchParams.get("time");
    const newDate = url.searchParams.get("date");
    return { ...data, newFormattedDate, oldTime, newTime, oldDate, newDate };
  }
  return json({ date, time });
};