import { LoaderArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react';
import Booking from '~/component/Booking'

export const loader = async({request}:LoaderArgs) =>{

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
