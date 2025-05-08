import React, { useEffect } from "react";
import TimeDropdown from "./TimeDropdown";

import { EventType } from "../helpers/dataTypes";
import { convertTo24Hour, formatTime } from "../helpers/timeHelpers";
import { InputRowStyled } from "../helpers/componentStyles";
import InputActions from "./InputActions";
import type { Dayjs } from "dayjs";
import AntdDateInput from "./AntdDateInput";
import { InputBox } from "../helpers/componentStyles";
interface InputHeaderProps {
    setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
    eventToEdit: EventType | null;
    setEventToEdit: React.Dispatch<React.SetStateAction<EventType | null>>;
    allDay: boolean;
    setAllDay: React.Dispatch<React.SetStateAction<boolean>>;
    eventName: string;
    setEventName: React.Dispatch<React.SetStateAction<string>>;
    startTime: string;
    setStartTime: React.Dispatch<React.SetStateAction<string>>;
    endTime: string;
    setEndTime: React.Dispatch<React.SetStateAction<string>>;
    startDateObj: Dayjs | null;
    setStartDateObj: React.Dispatch<React.SetStateAction<Dayjs | null>>;
    endDateObj: Dayjs | null;
    setEndDateObj: React.Dispatch<React.SetStateAction<Dayjs | null>>;
    eventDate: Dayjs;
}
const InputHeader: React.FC<InputHeaderProps> = (props) => {
    const {
        eventDate,
        setEvents,
        eventToEdit,
        setEventToEdit,
        allDay,
        setAllDay,
        eventName,
        setEventName,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        startDateObj,
        setStartDateObj,
        endDateObj,
        setEndDateObj,
    } = props;

    useEffect(() => {
        if (eventToEdit) {
            setEventName(eventToEdit.title);
            setStartTime(formatTime(eventToEdit.startTime));
            setEndTime(formatTime(eventToEdit.endTime));
        } else {
            setEventName("");
            setStartTime("");
            setEndTime("");
        }
    }, [eventToEdit]);

    const startTime24 = convertTo24Hour(startTime);
    const endTime24 = convertTo24Hour(endTime);
    const eventTimeInValid = startTime24 !== null && endTime24 !== null;

    const handleAllDay = () => {
        setAllDay(!allDay);
    };

    return (
        <InputBox>
            <div>{eventToEdit ? "Edit" : "Create"} Calendar Event:</div>
            <InputRowStyled>
                <input
                    type="text"
                    placeholder="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                />
                <TimeDropdown
                    selectedTime={startTime}
                    setSelectedTime={setStartTime}
                    dropdownLabel="Event Start"
                    allDay={allDay}
                />
                <TimeDropdown
                    selectedTime={endTime}
                    setSelectedTime={setEndTime}
                    dropdownLabel="Event End"
                    allDay={allDay}
                />
            </InputRowStyled>
            <InputRowStyled>
                <AntdDateInput
                    inputTitle="Event Start"
                    dateObj={startDateObj}
                    setDateObj={setStartDateObj}
                />
                <AntdDateInput
                    inputTitle="Event End"
                    dateObj={endDateObj}
                    setDateObj={setEndDateObj}
                />
            </InputRowStyled>
            <InputRowStyled>
                <>
                    <input
                        type="checkbox"
                        checked={allDay}
                        onChange={handleAllDay}
                    />
                    <label>All Day</label>
                </>
                <InputActions
                    eventDate={eventDate}
                    setEndDateObj={setEndDateObj}
                    setStartDateObj={setStartDateObj}
                    eventName={eventName}
                    startTime={startTime}
                    endTime={endTime}
                    eventTimeInValid={eventTimeInValid}
                    eventToEdit={eventToEdit}
                    setEvents={setEvents}
                    setEventName={setEventName}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                    setEventToEdit={setEventToEdit}
                    allDay={allDay}
                    setAllDay={setAllDay}
                    startDateObj={startDateObj}
                    endDateObj={endDateObj}
                />
            </InputRowStyled>
        </InputBox>
    );
};

export default InputHeader;
