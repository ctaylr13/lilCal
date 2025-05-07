import React from "react";
import type { Dayjs } from "dayjs";
import DateDisplay from "./DateDisplay";

import { TimelineContainer, TimelineWrapper } from "../helpers/componentStyles";
import AllDayEvents from "./AllDayEvents";
import TimelineHours from "./TimelineHours";
import { EventType } from "../helpers/dataTypes";
import TimelineEvents from "./TimelineEvents";
import styled from "styled-components";
export const DateContainer = styled.div`
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 10;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    /* margin-bottom: 10px; // space below the container
    padding: 10px 20px; // internal spacing */
`;

const Timeline: React.FC<{
    events: EventType[];
    setEventToEdit: React.Dispatch<React.SetStateAction<EventType | null>>;
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
    allDayEvents,
    setAllDay,
}) => {
    return (
        <TimelineContainer>
            <DateContainer>
                <DateDisplay selectedDate={selectedDate} />
                <AllDayEvents
                    allDayEvents={allDayEvents}
                    setAllDay={setAllDay}
                    setEventToEdit={setEventToEdit}
                />
            </DateContainer>
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
