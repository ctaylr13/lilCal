import React from "react";
import type { Dayjs } from "dayjs";

import {
    TimelineContainer,
    Header,
    DateRow,
    LeftArrow,
    RightArrow,
    TimelineWrapper,
} from "../helpers/componentStyles";

import AllDayEvents from "./AllDayEvents";
import TimelineHours from "./TimelineHours";
import { EventType } from "../helpers/dataTypes";
import TimelineEvents from "./TimelineEvents";

const Timeline: React.FC<{
    events: EventType[];
    setEventToEdit: React.Dispatch<React.SetStateAction<EventType | null>>;
    todaysDate: Dayjs;
    eventDate: Dayjs;
    selectedDate: Dayjs;
    setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    allDayEvents: EventType[];
    setAllDay: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
    events,
    selectedDate,
    setEventToEdit,
    eventDate,
    todaysDate,
    setSelectedDate,
    allDayEvents,
    setAllDay,
}) => {
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
        <TimelineContainer>
            <Header>Today's Date: {todaysDate.format("YYYY-MM-DD")}</Header>
            <DateRow>
                <LeftArrow onClick={handlePrevDay} />
                <Header>selected date {eventDate.format("YYYY-MM-DD")}</Header>
                <RightArrow onClick={handleNextDay} />
            </DateRow>
            <AllDayEvents
                allDayEvents={allDayEvents}
                setAllDay={setAllDay}
                setEventToEdit={setEventToEdit}
            />
            <TimelineWrapper>
                <TimelineHours
                    setEventToEdit={setEventToEdit}
                    eventDate={eventDate}
                />
                <TimelineEvents
                    events={events}
                    setEventToEdit={setEventToEdit}
                    eventDate={eventDate}
                />
            </TimelineWrapper>
        </TimelineContainer>
    );
};

export default Timeline;
