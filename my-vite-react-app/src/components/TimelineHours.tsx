import React from "react";
import { v4 as uuidv4 } from "uuid";

import { HoursColumn, HourRow, HourLabel } from "../helpers/componentStyles";
import type { Dayjs } from "dayjs";
import { EventType } from "../helpers/dataTypes";

interface TimelineHoursProps {
    setEventToEdit: React.Dispatch<React.SetStateAction<EventType | null>>;
    eventDate: Dayjs;
}
const TimelineHours: React.FC<TimelineHoursProps> = (props) => {
    const { setEventToEdit, eventDate } = props;
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const hourBlockOnClick = (hour: number, date: Dayjs) => {
        const newEvent = {
            id: uuidv4(),
            title: "New Event",
            startTime: date.set("hour", hour).set("minute", 0).toISOString(),
            endTime: date
                .set("hour", hour + 1)
                .set("minute", 0)
                .toISOString(),
        };
        setEventToEdit(newEvent);
    };
    return (
        <HoursColumn>
            {hours.map((hour) => {
                const displayHour = hour % 12 || 12;
                const amPm = hour < 12 ? "AM" : "PM";
                return (
                    <HourRow
                        key={hour}
                        $hour={hour}
                        onClick={() => hourBlockOnClick(hour, eventDate)}
                    >
                        <HourLabel>
                            {displayHour}:00 {amPm}
                        </HourLabel>
                    </HourRow>
                );
            })}
        </HoursColumn>
    );
};

export default TimelineHours;
