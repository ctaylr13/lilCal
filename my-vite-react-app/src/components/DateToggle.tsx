import React from "react";
import type { Dayjs } from "dayjs";
import { EventType } from "../helpers/dataTypes";
import {
    Header,
    DateRow,
    LeftArrow,
    RightArrow,
} from "../helpers/componentStyles";

interface DateToggleProps {
    eventDate: Dayjs;
    setEventToEdit: React.Dispatch<React.SetStateAction<EventType | null>>;
    setAllDay: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

const DateToggle: React.FC<DateToggleProps> = (props) => {
    const { setAllDay, eventDate, setEventToEdit, setSelectedDate } = props;

    const handleChangeDay = (direction: number) => {
        setEventToEdit(null);
        setSelectedDate((prevDate) => prevDate.add(direction, "day"));
        setAllDay(false);
    };

    return (
        <DateRow>
            <LeftArrow onClick={() => handleChangeDay(-1)} />
            <RightArrow onClick={() => handleChangeDay(1)} />
            <Header>{eventDate.format("MMMM D, YYYY")}</Header>
        </DateRow>
    );
};

export default DateToggle;
