import React from "react";
import { EventsContainer, HourRow } from "../helpers/componentStyles";
import EventSpan from "./EventSpan";
import { EventType } from "../helpers/dataTypes";
import type { Dayjs } from "dayjs";
import { assignEventColumns } from "../helpers/timelineHelpers";

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
            {/* Optionally, add grid lines for each hour */}
            {hours.map((hour) => (
                <HourRow
                    key={hour}
                    style={{
                        position: "absolute",
                        top: hour * 60,
                        left: 0,
                        right: 0,
                        height: 60,
                    }}
                ></HourRow>
            ))}

            {/* Render all events as overlay spans */}
            {events.map((event) => (
                <EventSpan
                    columnIndex={
                        processedEvents.find((e) => e.event.id === event.id)
                            ?.columnIndex || 0
                    }
                    totalColumns={
                        processedEvents.find((e) => e.event.id === event.id)
                            ?.totalColumns || 1
                    }
                    key={event.id}
                    event={event}
                    setEventToEdit={setEventToEdit}
                    startTime={eventDate}
                    dayStart={dayStart}
                    dayEnd={dayEnd}
                />
            ))}
        </EventsContainer>
    );
};

export default TimelineEvents;
