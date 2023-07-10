import { LoaderArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react';
import Booking from '~/component/Booking'

export const loader = async({request, params}:LoaderArgs) =>{
 const url = new URL(request.url);
 console.log(url);
  const rescheduleId = url.searchParams.get("bookingId");
  console.log(rescheduleId);
  if(rescheduleId) {
    const res = await fetch(`http://localhost:3333/api/meeting/${rescheduleId}`) 
      
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
