import React, { useEffect } from "react";
import TimeDropdown from "./TimeDropdown";

import { EventType } from "../helpers/dataTypes";
import { convertTo24Hour, formatTime } from "../helpers/timeHelpers";
import { InputRowStyled } from "../helpers/componentStyles";
import InputActions from "./InputActions";
import type { Dayjs } from "dayjs";
import DateInput from "./DateInput";

import styled from "styled-components";
const Box = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;
interface InputHeaderProps {
    setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
    eventToEdit: EventType | null;
    setEventToEdit: React.Dispatch<React.SetStateAction<EventType | null>>;
    eventDate: Dayjs;
    allDay: boolean;
    setAllDay: React.Dispatch<React.SetStateAction<boolean>>;
    eventName: string;
    setEventName: React.Dispatch<React.SetStateAction<string>>;
    startTime: string;
    setStartTime: React.Dispatch<React.SetStateAction<string>>;
    endTime: string;
    setEndTime: React.Dispatch<React.SetStateAction<string>>;
    startDateStr: string;
    setStartDateStr: React.Dispatch<React.SetStateAction<string>>;
    startDateObj: Dayjs | null;
    setStartDateObj: React.Dispatch<React.SetStateAction<Dayjs | null>>;
    endDateStr: string;
    setEndDateStr: React.Dispatch<React.SetStateAction<string>>;
    endDateObj: Dayjs | null;
    setEndDateObj: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}
const InputHeader: React.FC<InputHeaderProps> = (props) => {
    const {
        setEvents,
        eventToEdit,
        setEventToEdit,
        eventDate,
        allDay,
        setAllDay,
        eventName,
        setEventName,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        startDateStr,
        setStartDateStr,
        startDateObj,
        setStartDateObj,
        endDateStr,
        setEndDateStr,
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

    const eventTimeInValid =
        startTime24 !== null && endTime24 !== null && startTime24 >= endTime24;
    const handleAllDay = () => {
        setAllDay(!allDay);
    };

    return (
        <Box>
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
                <DateInput
                    inputTitle="Event Start"
                    dateStr={startDateStr}
                    setDateStr={setStartDateStr}
                    setDateObj={setStartDateObj}
                />
                <DateInput
                    inputTitle="Event End"
                    dateStr={endDateStr}
                    setDateStr={setEndDateStr}
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
                    eventDate={eventDate}
                    allDay={allDay}
                    setAllDay={setAllDay}
                    startDateObj={startDateObj}
                    endDateObj={endDateObj}
                />
            </InputRowStyled>
        </Box>
    );
};

export default InputHeader;
