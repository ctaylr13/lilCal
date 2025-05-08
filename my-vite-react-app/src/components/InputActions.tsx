import React from "react";
import {
    createEvent,
    deleteEvent,
    submitOrUpdateEvent,
} from "../helpers/eventHelpers";
import { EventType } from "../helpers/dataTypes";
import type { Dayjs } from "dayjs";
import { convertTo24Hour } from "../helpers/timeHelpers";
import { ActionsButtonRow } from "../helpers/componentStyles";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
interface InputActionsProps {
    eventDate: Dayjs;
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
    allDay?: boolean;
    setAllDay: React.Dispatch<React.SetStateAction<boolean>>;
    startDateObj: Dayjs | null;
    endDateObj: Dayjs | null;
    setStartDateObj: React.Dispatch<React.SetStateAction<Dayjs | null>>;
    setEndDateObj: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}

const InputActions: React.FC<InputActionsProps> = (props) => {
    const {
        eventDate,
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
        setEndDateObj,
        setStartDateObj,
        allDay,
        setAllDay,
        startDateObj,
        endDateObj,
    } = props;

    const resetFields = () => {
        const newDateObj = dayjs(eventDate);
        setEventName("");
        setStartTime("");
        setEndTime("");
        setAllDay(false);
        setEventToEdit(null);
        setEndDateObj(newDateObj);
        setStartDateObj(newDateObj);
    };

    const dateInvalid = () => {
        if (!startDateObj || !endDateObj) return true;
        const startDate = startDateObj.format("YYYY-MM-DD");
        const endDate = endDateObj.format("YYYY-MM-DD");
        return startDate > endDate;
    };
    const submitEvent = async () => {
        const startTime24 = convertTo24Hour(startTime);
        const endTime24 = convertTo24Hour(endTime);
        if (startDateObj === null || endDateObj === null) {
            notify("Please select a date.");
            resetFields();
            return;
        }

        if (
            startDateObj === endDateObj &&
            endTime24 &&
            startTime24 &&
            endTime24 < startTime24
        ) {
            notify("End time cannot be before start time.");
            resetFields();
            return;
        }
        if (!allDay && (startTime24 === null || endTime24 === null)) {
            notify("Please select a valid time.");
            resetFields();
            return;
        }
        if (dateInvalid()) {
            notify("End date cannot be before start date.");
            resetFields();
            return;
        }

        const event = createEvent(
            eventToEdit,
            eventName,
            startTime24 || "",
            endTime24 || "",
            allDay,
            startDateObj,
            endDateObj
        );

        await submitOrUpdateEvent(event, setEvents, eventToEdit ? true : false);

        resetFields();
    };

    const notify = (message: string) => toast(message);

    const deleteEventOnClick = () => {
        if (!eventToEdit) return;
        deleteEvent(eventToEdit?.id, setEvents);
        resetFields();
    };

    return (
        <ActionsButtonRow>
            <button disabled={!eventName} onClick={() => submitEvent()}>
                Submit
            </button>
            {eventToEdit && (
                <>
                    <button onClick={() => setEventToEdit(null)}>Cancel</button>
                    <button onClick={() => deleteEventOnClick()}>Delete</button>
                </>
            )}
            <ToastContainer aria-label={undefined} position="bottom-left" />
        </ActionsButtonRow>
    );
};

export default InputActions;
