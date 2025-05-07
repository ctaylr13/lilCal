import React from "react";
import { createEvent, submitData } from "../helpers/eventHelpers";
import { EventType } from "../helpers/dataTypes";
import type { Dayjs } from "dayjs";
import { convertTo24Hour } from "../helpers/timeHelpers";
import { ActionsButtonRow } from "../helpers/componentStyles";
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

    const submitEvent = async () => {
        const startTime24 = convertTo24Hour(startTime);
        const endTime24 = convertTo24Hour(endTime);

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

        submitData(event, setEvents);
        // Reset form fields
        setEventName("");
        setStartTime("");
        setEndTime("");
        setAllDay(false);
        setEventToEdit(null);
    };

    return (
        <ActionsButtonRow>
            <button disabled={submitDisabled} onClick={() => submitEvent()}>
                Submit
            </button>
            {eventToEdit && (
                <>
                    <button onClick={() => setEventToEdit(null)}>Cancel</button>
                    <button onClick={() => deleteEvent()}>Delete</button>
                </>
            )}
        </ActionsButtonRow>
    );
};

export default InputActions;
