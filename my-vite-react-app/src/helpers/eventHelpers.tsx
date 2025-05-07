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
    startTime24: string, // e.g., "14:00"
    endTime24: string, // e.g., "16:00"
    eventDate: Dayjs, // date of the event
    allDay: boolean | undefined,
    startDateObj: Dayjs | null,
    endDateObj: Dayjs | null
) => {
    const dateStr = eventDate.format("YYYY-MM-DD");
    let startTimeISO: string;
    let endTimeISO: string;
    const startDateStr = startDateObj?.format("YYYY-MM-DD");
    const endDateStr = endDateObj?.format("YYYY-MM-DD");
    // console.log("SUBMITTED DATE??", startDateObj?.format("YYYY-MM-DD"));
    const newEvent: EventType = {
        id: eventToEdit ? eventToEdit.id : uuidv4(),
        title: eventName,
        allDay: false, // default
        startTime: "", // to be set
        endTime: "", // to be set
        startDay: startDateStr || dateStr,
        endDay: endDateStr || dateStr,
    };

    if (allDay) {
        // Set start at 00:00:00Z
        startTimeISO = `${startDateStr ? startDateStr : dateStr}T00:00:00Z`;
        // Set end at 23:59:59Z
        endTimeISO = `${endDateStr ? endDateStr : dateStr}T23:59:59Z`;
        newEvent.allDay = true;
        newEvent.startDay = dateStr; // Set startDay to the event date
    } else {
        // Construct times from provided startTime24 and endTime24
        startTimeISO = dayjs(
            `${startDateStr ? startDateStr : dateStr}T${startTime24}`
        ).toISOString();
        endTimeISO = dayjs(
            `${endDateStr ? endDateStr : dateStr}T${endTime24}`
        ).toISOString();
    }

    newEvent.startTime = startTimeISO;
    newEvent.endTime = endTimeISO;

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
