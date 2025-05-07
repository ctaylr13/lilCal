import React from "react";
import type { Dayjs } from "dayjs";
import DateDisplay from "./DateDisplay";

import { TimelineContainer, TimelineWrapper } from "../helpers/componentStyles";
import AllDayEvents from "./AllDayEvents";
import TimelineHours from "./TimelineHours";
import { EventType } from "../helpers/dataTypes";
import TimelineEvents from "./TimelineEvents";
import { DateContainer } from "../helpers/componentStyles";

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
