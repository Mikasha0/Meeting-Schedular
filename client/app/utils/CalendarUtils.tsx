import { parse, eachDayOfInterval, endOfMonth, add, format } from 'date-fns';

export const calculateDaysOfMonth = (currentMonth:any) => {
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  return days;
};

export const getPreviousMonth = (currentMonth:any, setCurrentMonth:any) => {
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
  setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
};

export const getNextMonth = (currentMonth:any, setCurrentMonth:any) => {
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
  setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
};

export const toggleVisibility = (visible:any, setVisible:any) => {
  setVisible(!visible);
};

export const handleRadioChange = (event:any, setSelectedLocation:any) => {
  setSelectedLocation(event.target.value);
};
