import { LoaderArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
    const url = new URL(request.url);
  
    const bookingID = url.searchParams.get("bookingId");
    const reason = url.searchParams.get("reason");
    const newDate = url.searchParams.get("newDate");
  
    if (bookingID) {
      const res = await fetch(`${process.env.API_URL}/${bookingID}`);
      const booking = await res.json();
      return { ...booking, reason, newDate };
    }
  };