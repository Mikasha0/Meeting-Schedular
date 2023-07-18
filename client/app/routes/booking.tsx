import { LoaderArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react';
import Booking from '~/component/Booking'

export const loader = async({request}:LoaderArgs) =>{
 const url = new URL(request.url);
 
 console.log(url);
  const bookingID = url.searchParams.get("bookingId");
  const reason = url.searchParams.get("reason");

  console.log(bookingID);
  if(bookingID) {
    const res = await fetch(`http://localhost:3333/api/meeting/${bookingID}`) 
      const booking = await res.json()
      console.log(booking)
    return {...booking, reason}
 }
  }

export default function booking() {
  const data = useLoaderData<typeof loader>();

  return (
    <Booking data={data}/>
  )
}
