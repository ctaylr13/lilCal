import React from "react";
import { createEvent } from "../helpers/eventHelpers";
import { EventType } from "../helpers/dataTypes";
import type { Dayjs } from "dayjs";
import styled from "styled-components";
const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 15px;
`;
interface InputActionsProps {
    eventName: string;
    startTime: string;
    endTime: string;
    eventTimeInValid: boolean;
    eventToEdit: EventType | null;
    setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
    setEventName: React.Dispatch<React.SetStateAction<string>>;
    setStartTime: React.Dispatch<React.SetStateAction<string>>;
    setEndTime: React.Dispatch<React.SetStateAction<string>>;
    setEventToEdit: React.Dispatch<React.SetStateAction<EventType | null>>;
    eventDate: Dayjs;
    allDay?: boolean;
    setAllDay: React.Dispatch<React.SetStateAction<boolean>>;
    startDateObj: Dayjs | null;
    endDateObj: Dayjs | null;
}

const InputActions: React.FC<InputActionsProps> = (props) => {
    const {
        eventName,
        startTime,
        endTime,
        eventTimeInValid,
        eventToEdit,
        setEvents,
        setEventToEdit,
        setEventName,
        setStartTime,
        setEndTime,
        eventDate,
        allDay,
        setAllDay,
        startDateObj,
        endDateObj,
    } = props;
    const isValid =
        (allDay && eventName) ||
        (!allDay && eventName && startTime && endTime && !eventTimeInValid);

    const submitDisabled = !isValid;

    const deleteEvent = () => {
        setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== eventToEdit?.id)
        );
        setEventToEdit(null);
    };

    const convertTo24HourFormat = (time: string) => {
        const [timePart, modifier] = time.split(" "); // Split into time and AM/PM
        let [hours, minutes] = timePart.split(":").map(Number);

        if (modifier === "PM" && hours < 12) {
            hours += 12; // Convert PM hours
        } else if (modifier === "AM" && hours === 12) {
            hours = 0; // Handle 12 AM case
        }

        // Return formatted hours and minutes
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
        )}`;
    };
    const submitEvent = () => {
        const startTime24 = convertTo24HourFormat(startTime);
        const endTime24 = convertTo24HourFormat(endTime);

        if (!startTime24 || !endTime24) {
            console.error("Invalid time input.");
            return; // Prevent submission if times are invalid
        }

        const event = createEvent(
            eventToEdit,
            eventName,
            startTime24,
            endTime24,
            eventDate,
            allDay,
            startDateObj,
            endDateObj
        );

        setEvents((prevEvents) => {
            if (eventToEdit) {
                return prevEvents.map((prevEvent) =>
                    prevEvent.id === event.id ? event : prevEvent
                );
            }
            return [...prevEvents, event];
        });

        setEventName("");
        setStartTime("");
        setEndTime("");
        setAllDay(false);
        setEventToEdit(null);
    };
    return (
        <ButtonRow>
            <button disabled={submitDisabled} onClick={() => submitEvent()}>
                Submit
            </button>
            {eventToEdit && (
                <>
                    <button onClick={() => setEventToEdit(null)}>Cancel</button>
                    <button onClick={() => deleteEvent()}>Delete</button>
                </>
            )}
        </ButtonRow>
    );
};

export default InputActions;
