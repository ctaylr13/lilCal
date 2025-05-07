import { v4 as uuidv4 } from "uuid";
import { EventType } from "./dataTypes";
export const ExampleEvents: EventType[] = [
    {
        id: uuidv4(),
        title: "Red Sox Game",
        startTime: "2025-05-01T10:00:00Z",
        endTime: "2025-05-01T12:00:00Z",
    },
    {
        id: uuidv4(),
        title: "Concert",
        startTime: "2025-05-01T18:00:00Z",
        endTime: "2025-05-01T20:00:00Z",
    },
    {
        id: uuidv4(),
        title: "Study Hall",
        startTime: "2025-05-01T14:00:00Z",
        endTime: "2025-05-01T16:00:00Z",
    },
    {
        id: uuidv4(),
        title: "Rehearsal",
        startTime: "2025-05-04T11:00:00Z",
        endTime: "2025-05-04T12:00:00Z",
    },
    {
        id: uuidv4(),
        title: "Gemstones",
        startTime: "2025-05-05T11:00:00Z",
        endTime: "2025-05-05T12:00:00Z",
    },
    {
        id: uuidv4(),
        title: "Coaching",
        startTime: "2025-05-05T14:00:00Z",
        endTime: "2025-05-05T16:00:00Z",
    },
    {
        id: uuidv4(),
        title: "All Day Event 1",
        startTime: "2025-05-01T00:00:00Z",
        endTime: "2025-05-01T23:59:59Z",
        allDay: true,
        startDay: "2025-05-01",
    },
    {
        id: uuidv4(),
        title: "All Day Event 2",
        startTime: "2025-05-01T00:00:00Z",
        endTime: "2025-05-01T23:59:59Z",
        allDay: true,
        startDay: "2025-05-01",
    },
    {
        id: uuidv4(),
        title: "All Day Event 3",
        startTime: "2025-05-01T00:00:00Z",
        endTime: "2025-05-01T23:59:59Z",
        allDay: true,
        startDay: "2025-05-01",
    },
    {
        id: uuidv4(),
        title: "Multi-Day Event",
        startTime: "2025-05-06T20:00:00Z",
        endTime: "2025-05-07T08:00:00Z",
        allDay: false,
        startDay: "2025-05-06",
        endDay: "2025-05-07",
    },
];
