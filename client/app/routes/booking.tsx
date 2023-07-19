import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Booking from "~/component/Booking";
import { cancelSchemaObj } from "~/types/z.schema";
import { badRequest } from "~/utils/request.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const cancel = form.get("cancel") as string;
  const params = new URLSearchParams(request.url.split("?")[1]);
  const bookingId = params.get('bookingId')
  console.log(bookingId)
  const parseResult = cancelSchemaObj.safeParse({
    cancel,
  });
  if (!parseResult.success) {
    const fieldErrors = parseResult.error.format();
    console.log(JSON.stringify(fieldErrors));

    return badRequest({
      fieldErrors,
      fields: null,
      formError: "Form not submitted correctly",
    });
  }
  const API_URL = `http://localhost:3333/api/meeting/${bookingId}`;

  try {
    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parseResult.data),
    });
    const data = await response.json();
    return redirect('/')
  
  } catch (error) {
    console.log("API request error:", error);
    return new Response("API request error", { status: 500 });
  }
};

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);

  console.log(url);
  const bookingID = url.searchParams.get("bookingId");
  const reason = url.searchParams.get("reason");
  console.log(reason);
  const newDate = url.searchParams.get("newDate");
  console.log(newDate);

  console.log(bookingID);
  if (bookingID) {
    const res = await fetch(`http://localhost:3333/api/meeting/${bookingID}`);
    const booking = await res.json();
    console.log(booking);
    return { ...booking, reason, newDate };
  }
};

export default function booking() {
  const data = useLoaderData<typeof loader>();

  return <Booking data={data} />;
}
