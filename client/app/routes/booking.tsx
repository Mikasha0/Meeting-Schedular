import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { action as bookingMeeting } from "~/actions/bookingMeeting";
import Booking from "~/component/Booking";
import { loader as getBooking } from '~/loaders/getBooking';


export async function action(args:ActionArgs){
  return bookingMeeting(args);
}

export async function loader (args:LoaderArgs){
  return getBooking(args);
}

export default function booking() {
  const data = useLoaderData<typeof loader>();

  return <Booking data={data} />;
}
