import { holidays, Weekday } from "~/types/z.schema";

export function getMeetingFormData(form: FormData) {
    const guestList = form.get('guest-email')
    return {
      name: form.get('name') as string,
      email: form.get('email') as string,
      location: form.get('location') as string,
      notes: form.get('notes'),
      guests: guestList ?[guestList]: null,
      reason:form.get("reason")
    };
  }
  
  export const getNonHoliday = (currentDay: Date):Date => {
    const nextDate = new Date(currentDay)
    nextDate.setDate(currentDay.getDate()+ 1)
    const day = Weekday[nextDate.getDay()]
    if(holidays.includes(day)){
      return getNonHoliday(nextDate)
    }
    return nextDate;
    
  }



  