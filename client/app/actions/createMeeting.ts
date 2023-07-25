import { ActionArgs, redirect } from "@remix-run/node";
import { meetingSchema } from "~/types/z.schema";
import { getMeetingFormData } from "~/utils/formUtils";
import { badRequest } from "~/utils/request.server";

export const createMeetingAction = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const { name, email, location, notes, guests, reason } =
    getMeetingFormData(form);
  
  const params = new URLSearchParams(request.url.split("?")[1]);
  const time = params.get("time");
  const date = params.get("date");
  const parseResult = meetingSchema.safeParse({
    time,
    email,
    date,
    name,
    location,
    notes: notes === "" ? null : notes,
    guests,
    reason,
  });

  if (!parseResult.success) {
    const fieldErrors = parseResult.error.format();
    return badRequest({
      fieldErrors,
      fields: null,
      formError: "Form not submitted correctly",
    });
  }
  const API_URL = `${process.env.API_URL}`;
  

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parseResult.data),
    });
    const data = await response.json();
    return redirect(`/booking/?bookingId=${data.id}`);
  } catch (error) {
    return new Response("API request error", { status: 500 });
  }
};