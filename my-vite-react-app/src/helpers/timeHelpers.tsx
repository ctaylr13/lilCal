import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { EventType } from "./dataTypes";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// Returns null if invalid input
export const convertTo24Hour = (time: string): string | null => {
    if (!time) return null;
    const parsedTime = dayjs(time, ["h:mm A"], true);
    if (!parsedTime.isValid()) return null;
    return parsedTime.format("HH:mm"); // e.g., "14:30"
};

// Helper to format a date string into "h:mm A" (e.g., "3:15 PM")
export const formatTime = (dateString: string): string => {
    const date = dayjs(dateString);
    if (!date.isValid()) return "";
    return date.format("h:mm A");
};

export const formatEventTime = (startTime: string, endTime: string): string => {
    const start = dayjs(startTime);
    const end = dayjs(endTime);
    if (!start.isValid() || !end.isValid()) return "";
    return `${start.format("h:mm A")} - ${end.format("h:mm A")}`;
};

export const filterEventsByTypeAndDate = (
    events: EventType[],
    eventDate: Dayjs,
    includeAllDay: boolean
) => {
    const currentDateStr = eventDate.format("YYYY-MM-DD");
    const currentDate = dayjs(currentDateStr);

    return events.filter((event) => {
        if (includeAllDay && event.allDay) {
            const start = dayjs(event.startDay);
            const end = dayjs(event.endDay || event.startDay);
            return (
                currentDate.isSameOrAfter(start, "day") &&
                currentDate.isSameOrBefore(end, "day")
            );
        } else if (!includeAllDay && !event.allDay) {
            const eventStart = dayjs(event.startTime);
            const eventEnd = dayjs(event.endTime);
            const startOfDay = currentDate.startOf("day");
            const endOfDay = currentDate.endOf("day");
            return (
                eventStart.isBefore(endOfDay) && eventEnd.isAfter(startOfDay)
            );
        } else {
            return false;
        }
    });
};
