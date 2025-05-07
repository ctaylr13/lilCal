import React from "react";
import { AllDayEventsContainer } from "../helpers/componentStyles";
import { EventType } from "../helpers/dataTypes";
interface AllDayEventsProps {
    allDayEvents: EventType[];
    setAllDay: React.Dispatch<React.SetStateAction<boolean>>;
    setEventToEdit: React.Dispatch<React.SetStateAction<EventType | null>>;
}
const AllDayEvents: React.FC<AllDayEventsProps> = (props) => {
    const { allDayEvents, setAllDay, setEventToEdit } = props;
    const allDayEventOnClick = (event: EventType) => {
        const newEvent = {
            ...event,
            startTime: "",
            endTime: "",
        };
        setAllDay(true);
        setEventToEdit(newEvent);
    };
    return (
        <AllDayEventsContainer>
            <div>All Day Events</div>
            {allDayEvents.map((event) => (
                <strong
                    key={event.id}
                    onClick={() => allDayEventOnClick(event)}
                >
                    {event.title}
                </strong>
            ))}
        </AllDayEventsContainer>
    );
};

export default AllDayEvents;
