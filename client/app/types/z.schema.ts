import { Schema, z } from "zod";
export const Weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const

z.enum(Weekday)

export const holidays = ["SAT", "SUN"]
export enum ACCEPTED_TIME {
    "10:30" = "10:30",
    "11:00" = "11:00",
    "11:30" = "11:30",
    "12:00" = "12:00",
    // "12:30" = "12:30",
    // "01:00" = "01:00",
    // "01:30" = "01:30",
    // "02:00" = "02:00",
    // "02:30" = "02:30",
    // "03:00" = "03:00",
    // "03:30" = "03:30"
}


export enum MeetingLocations {
    'Yarsa Meet'= 'Yarsa Meet',
    'Yarsa Labs Office, Kathmandu' = 'Yarsa Labs Office, Kathmandu',
    'Yarsa Labs Office, Pokhara' = 'Yarsa Labs Office, Pokhara'
}

export const meetingSchema = z.object({
    name: z.string().min(1).regex(/^[^\d]*$/),
    email: z.string().email({"message": "Invalid email"}),
    date: z.string(),
    time: z.nativeEnum(ACCEPTED_TIME),
    location: z.nativeEnum(MeetingLocations),
    notes: z.string().optional().nullable(),
    guests: z.array(z.string().email({"message":"Invalid email"})).optional().nullable()
}).refine((schema)=> {
    return (schema.guests?.includes(schema.email), {message: 'Hi bro'})
})