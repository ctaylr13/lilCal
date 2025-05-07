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

export const submitData = async (
    event: EventType,
    setEvents: (value: React.SetStateAction<EventType[]>) => void
) => {
    try {
        const response = await fetch("http://localhost:3000/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        });

        if (!response.ok) {
            throw new Error(`Failed to create event: ${response.statusText}`);
        }

        const savedEvent = await response.json();

        // Update your local state with the new event
        setEvents((prevEvents) => [...prevEvents, savedEvent]);
    } catch (error) {
        console.error("Error creating event:", error);
    }
};
