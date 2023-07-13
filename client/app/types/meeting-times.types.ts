import { NavigateFunction } from "@remix-run/react";
import { CreateMeetingDto } from "./z.schema";
import { Key } from "react";

export interface MeetingTimesProps{
    selectedDay:Date,
    timeValues:Array<Key | null>,
    data:CreateMeetingDto,
    navigate:NavigateFunction,
    setVisible:(arg:boolean)=>void,
    visible:boolean

}