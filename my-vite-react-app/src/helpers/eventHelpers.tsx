import { v4 as uuidv4 } from "uuid";
import { EventType } from "../helpers/dataTypes";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export const fetchEvents = (
    setEvents: (value: React.SetStateAction<EventType[]>) => void
) => {
    fetch("http://localhost:3000/events")
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Network response was not ok: ${response.statusText}`
                );
            }
            return response.json();
        })
        .then((data) => {
            setEvents(data);
        })
        .catch((error) => {
            console.error("Error fetching events:", error);
        });
};

export const createEvent = (
    eventToEdit: EventType | null,
    eventName: string,
    startTime24: string,
    endTime24: string,
    allDay: boolean = false,
    startDateObj: Dayjs | null,
    endDateObj: Dayjs | null
) => {
    const startDateStr = startDateObj?.format("YYYY-MM-DD");
    const endDateStr = endDateObj?.format("YYYY-MM-DD");

    const newEvent: EventType = {
        id: eventToEdit?.id || uuidv4(),
        title: eventName,
        allDay,
        startTime: allDay
            ? `${startDateStr}T00:00:00Z`
            : dayjs(`${startDateStr}T${startTime24}`).toISOString(),
        endTime: allDay
            ? `${endDateStr}T23:59:59Z`
            : dayjs(`${endDateStr}T${endTime24}`).toISOString(),
        startDay: startDateStr,
        endDay: endDateStr,
    };
    return newEvent;
};
const apiRequest = async (
    url: string,
    method: string,
    body?: any
): Promise<any> => {
    const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }
    return response.json();
};

// Main function using the method parameter
export const submitOrUpdateEvent = async (
    event: EventType,
    setEvents: React.Dispatch<React.SetStateAction<EventType[]>>,
    isEditing: boolean
) => {
    const url = "http://localhost:3000/events";

    try {
        if (isEditing) {
            const updatedEvent = await apiRequest(
                `${url}/${event.id}`,
                "PATCH",
                event
            );
            setEvents((prev) =>
                prev.map((ev) =>
                    ev.id === updatedEvent.id ? updatedEvent : ev
                )
            );
        } else {
            const savedEvent = await apiRequest(url, "POST", event);
            setEvents((prev) => [...prev, savedEvent]);
        }
    } catch (error) {
        console.error("Error submitting/updating event:", error);
    }
};
