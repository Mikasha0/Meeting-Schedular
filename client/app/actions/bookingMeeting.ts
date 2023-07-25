import { ActionArgs, redirect } from "@remix-run/node";
import { cancelSchemaObj } from "~/types/z.schema";
import { badRequest } from "~/utils/request.server";

export const action = async ({ request }: ActionArgs) => {
    const form = await request.formData();
    const cancel = form.get("cancel") as string;
    const params = new URLSearchParams(request.url.split("?")[1]);
    const bookingId = params.get("bookingId");
    const parseResult = cancelSchemaObj.safeParse({
      cancel,
    });
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.format();
  
      return badRequest({
        fieldErrors,
        fields: null,
        formError: "Form not submitted correctly",
      });
    }
    const API_URL = `${process.env.API_URL}/${bookingId}`;
  
    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parseResult.data),
      });
      await response.json();
      return redirect("/");
    } catch (error) {
      return new Response("API request error", { status: 500 });
    }
  };