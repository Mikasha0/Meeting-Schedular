import { ActionArgs, LoaderArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react';
import Booking from '~/component/Booking'
import { cancelSchemaObj } from '~/types/z.schema';
import { badRequest } from '~/utils/request.server';

export const action =async({request}:ActionArgs)=> {
  const form = await request.formData();
  const cancel = form.get("cancel") as string;
  const parseResult = cancelSchemaObj.safeParse({
    cancel
  })
  if (!parseResult.success) {
    const fieldErrors = parseResult.error.format();
    console.log(JSON.stringify(fieldErrors));

    return badRequest({
      fieldErrors,
      fields: null,
      formError: "Form not submitted correctly",
    });
  }
}


export const loader = async({request}:LoaderArgs) =>{
 const url = new URL(request.url);
 
 console.log(url);
  const bookingID = url.searchParams.get("bookingId");
  const reason = url.searchParams.get("reason");
  console.log(reason)
  const newDate = url.searchParams.get("newDate")
  console.log(newDate)

  console.log(bookingID);
  if(bookingID) {
    const res = await fetch(`http://localhost:3333/api/meeting/${bookingID}`) 
      const booking = await res.json()
      console.log(booking)
    return {...booking, reason,newDate}
 }
  }

export default function booking() {
  const data = useLoaderData<typeof loader>();

  return (
    <Booking data={data}/>
  )
}
