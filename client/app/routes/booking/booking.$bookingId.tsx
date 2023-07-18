import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Booking from "~/component/Booking";

export const loader = async ({ request, params }: LoaderArgs) => {
  const id = params.bookingId;
  console.log(id);
  const url = new URL(request.url);
  console.log(url);
  const rescheduleId = url.searchParams.get("reschedule");
  if (rescheduleId) {
    const res = await fetch(
      `http://localhost:3333/api/meeting/${rescheduleId}`
    );
    console.log(await res.json());
    return await res.json();
  }
};
export default function booking() {
  const data = useLoaderData<typeof loader>();

  return <Booking data={data} />;
}
