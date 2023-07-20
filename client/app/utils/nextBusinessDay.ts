import {isSaturday, isSunday,setDay,addDays, startOfTomorrow} from 'date-fns'
export function getNextBusinessDay() {
    const tomorrow = startOfTomorrow();
  
    if (isSaturday(tomorrow) || isSunday(tomorrow)) {
      const nextMonday = setDay(addDays(tomorrow, 2), 1); 
      return nextMonday;
    } else {
      return tomorrow;
    }
  }