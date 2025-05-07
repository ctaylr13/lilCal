import React from "react";
import type { Dayjs } from "dayjs";
import { EventType } from "../helpers/dataTypes";
import styled from "styled-components";
import {
    Header,
    DateRow,
    LeftArrow,
    RightArrow,
} from "../helpers/componentStyles";
interface DateToggleProps {
    todaysDate: Dayjs;
    eventDate: Dayjs;
    setEventToEdit: React.Dispatch<React.SetStateAction<EventType | null>>;
    setAllDay: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    selectedDate: Dayjs;
}

const DateToggle: React.FC<DateToggleProps> = (props) => {
    const {
        todaysDate,
        setAllDay,
        eventDate,
        setEventToEdit,
        setSelectedDate,
        selectedDate,
    } = props;
    const handlePrevDay = () => {
        setEventToEdit(null);
        setSelectedDate(selectedDate.subtract(1, "day"));
        setAllDay(false);
    };

    const handleNextDay = () => {
        setEventToEdit(null);
        setSelectedDate(selectedDate.add(1, "day"));
        setAllDay(false);
    };
    return (
        <DateRow>
            {/* <Header>{todaysDate.format("MMMM D, YYYY")}</Header> */}
            <LeftArrow onClick={handlePrevDay} />
            <RightArrow onClick={handleNextDay} />
            {/* <Header>Viewing {eventDate.format("MMMM D, YYYY")} Event's</Header> */}
            <Header>{eventDate.format("MMMM D, YYYY")}</Header>
        </DateRow>
    );
};

export default DateToggle;
