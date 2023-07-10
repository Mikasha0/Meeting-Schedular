import { LoaderArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react';
import Booking from '~/component/Booking'

export const loader = async({request, params}:LoaderArgs) =>{
 const url = new URL(request.url);
 console.log(url);
  const bookingID = url.searchParams.get("bookingId");
  console.log(bookingID);
  if(bookingID) {
    const res = await fetch(`http://localhost:3333/api/meeting/${bookingID}`) 
      
    return  await res.json();
 }
  }

export default function booking() {
  const data = useLoaderData<typeof loader>();
  console.log(data)

  return (
    <Booking data={data}/>
  )
}
