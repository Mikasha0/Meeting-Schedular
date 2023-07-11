import { LoaderArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react';
import Booking from '~/component/Booking'

export const loader = async({request, params}:LoaderArgs) =>{
   const id = params.bookingId;
    console.log(id)
 const url = new URL(request.url);
 console.log(url);
  const rescheduleId = url.searchParams.get("reschedule");
  if(rescheduleId) {
    const res = await fetch(`http://localhost:3333/api/meeting/${rescheduleId}`)   
    console.log(await res.json())
    return await res.json();
  }
  return json([{
    id:"123445",
    name : "Aniket Tamrakar", 
    date : "Wednesday, July 5, 2023",
    email: "anikettamrakar0@gmail.com",
    location:"Yarsa Labs Office"
  }])
}
export default function booking() {
  const data = useLoaderData<typeof loader>();

  return (
    <Booking data={data}/>
  )
}
