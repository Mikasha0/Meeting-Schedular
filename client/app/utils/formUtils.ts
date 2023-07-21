import { holidays, Weekday } from "~/types/z.schema";

export function getMeetingFormData(form: FormData) {
    const guestList = form.getAll('guest-email')
    console.log(guestList)
    return {
      name: form.get('name') as string,
      email: form.get('email') as string,
      location: form.get('location') as string,
      notes: form.get('notes') as string, 
      guests: guestList ?? null,
      reason:form.get("reason") as string,
    };
  }
  



  