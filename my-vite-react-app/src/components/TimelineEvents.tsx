import React from "react";
import { EventsContainer, HourRow } from "../helpers/componentStyles";
import EventSpan from "./EventSpan";
import { EventType } from "../helpers/dataTypes";
import type { Dayjs } from "dayjs";
import {
    assignEventColumns,
    getEventLayoutInfo,
} from "../helpers/timelineHelpers";

interface TimelineEventsProps {
    events: EventType[];
    setEventToEdit: React.Dispatch<React.SetStateAction<EventType | null>>;
    eventDate: Dayjs;
}
const TimelineEvents: React.FC<TimelineEventsProps> = (props) => {
    const { events, setEventToEdit, eventDate } = props;
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const processedEvents = assignEventColumns(events);
    const dayStart = eventDate.startOf("day");
    const dayEnd = eventDate.endOf("day");

    return (
        <EventsContainer>
            {hours.map((hour) => (
                <HourRow key={hour} $hour={hour} />
            ))}
            {events.map((event) => {
                const { columnIndex, totalColumns } = getEventLayoutInfo(
                    event,
                    processedEvents
                );
                return (
                    <EventSpan
                        key={event.id}
                        event={event}
                        setEventToEdit={setEventToEdit}
                        startTime={eventDate}
                        dayStart={dayStart}
                        dayEnd={dayEnd}
                        columnIndex={columnIndex}
                        totalColumns={totalColumns}
                    />
                );
            })}
        </EventsContainer>
    );
};

export default TimelineEvents;
