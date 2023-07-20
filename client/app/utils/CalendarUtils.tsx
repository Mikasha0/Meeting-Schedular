import { parse, eachDayOfInterval, endOfMonth, add, format, startOfToday } from 'date-fns';
import { useState } from 'react';

export function useCurrentMonth() {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const [selectedLocation, setSelectedLocation] = useState("Yarsa Meet");

  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const handleRadioChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLocation(event.target.value);
  };

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  return {
    currentMonth,
    setCurrentMonth,
    firstDayCurrentMonth,
    days,
    previousMonth,
    nextMonth,
    handleRadioChange,
    selectedLocation
  };
}