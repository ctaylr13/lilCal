import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { EventType } from "./dataTypes";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
// Returns current date in 'M/D/YYYY' format, e.g., "5/4/2025"
export const formattedDate = () => {
    return dayjs().format("M/D/YYYY");
};

// Returns current time in 'h:mm:ss A' format, e.g., "3:15:30 PM"
export const formattedTime = () => {
    return dayjs().format("h:mm:ss A");
};

// Returns current date in 'YYYY-MM-DD' ISO format
export const isoDate = () => {
    return dayjs().format("YYYY-MM-DD");
};

// Converts a time string like "2:30 PM" to "14:30" (24-hour format)
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

export const filterNonAllDayEvents = (
    events: EventType[],
    endDateObj: Dayjs | null,
    eventDateObj: Dayjs
) => {
    const startOfDay = eventDateObj.startOf("day");
    const endOfDay = eventDateObj.endOf("day");

    return events.filter((event) => {
        const eventStart = dayjs(event.startTime);
        const eventEnd = dayjs(event.endTime);

        return (
            !event.allDay &&
            eventStart.isBefore(endOfDay) &&
            eventEnd.isAfter(startOfDay)
        );
    });
};

export const filterAllDayEvents = (events: EventType[], eventDate: Dayjs) => {
    const currentDate = dayjs(eventDate.format("YYYY-MM-DD"));

    return events.filter((event) => {
        if (event.allDay) {
            const start = dayjs(event.startDay);
            const end = dayjs(event.endDay || event.startDay);

            return (
                currentDate.isSameOrAfter(start, "day") &&
                currentDate.isSameOrBefore(end, "day")
            );
        } else {
            // For non-all-day events
            return event.startDay === eventDate.format("YYYY-MM-DD");
        }
    });
};
