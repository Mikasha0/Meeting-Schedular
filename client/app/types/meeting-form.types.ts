import { CreateMeetingDto } from "./z.schema";

export interface MeetingFormProps {
    toggleVisibility: () => void,
    actionData: any,
    data:CreateMeetingDto,
    handleRadioChange:(event:React.ChangeEvent<HTMLInputElement>)=> void,
    selectedLocation:String
}
