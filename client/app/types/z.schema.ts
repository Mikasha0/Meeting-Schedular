import { z } from "zod";
export const Weekday = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
] as const;

z.enum(Weekday);

export const holidays = ["SAT", "SUN"];
export enum ACCEPTED_TIME {
  "10:30" = "10:30",
  "11:00" = "11:00",
  "11:30" = "11:30",
  "12:00" = "12:00",
  "12:30" = "12:30",
  "13:00" = "13:00",
  "13:30" = "13:30",
  "14:00" = "14:00"
}

export const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export const EventActions = {
  CREATE: "notes",
  RESCHEDULE: "reason",
};

export enum MeetingLocations {
  "Yarsa Meet" = "Yarsa Meet",
  "Yarsa Labs Office, Kathmandu" = "Yarsa Labs Office, Kathmandu",
  "Yarsa Labs Office, Pokhara" = "Yarsa Labs Office, Pokhara",
}

export const meetingSchemaObj = z.object({
  name: z
    .string()
    .min(1)
    .regex(/^[^\d]*$/),
  email: z.string().email({ message: "Invalid email" }),
  date: z.string(),
  time: z.nativeEnum(ACCEPTED_TIME),
  location: z.nativeEnum(MeetingLocations),
  notes: z.string().optional().nullable(),
  guests: z
    .array(z.string().email({ message: "Invalid email" }))
    .optional()
    .nullable(),
});
export const meetingSchema = meetingSchemaObj.refine(
  (schema) => !schema.guests || !schema.guests.includes(schema.email),
  {
    message: "The organizer's email should not be included in the guests list",
  }
);

export const cancelSchemaObj = z.object({
  cancel: z.string().optional().nullable(),
});

export const MeetingIdReSchedule = meetingSchemaObj.extend({
  reason: z.string().optional().nullable(),
});
export const createMeetingSchemaID = meetingSchemaObj.extend({
  id: z.string(),
});
export type CreateMeetingDto = z.infer<typeof createMeetingSchemaID>;
