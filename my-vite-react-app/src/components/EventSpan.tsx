import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { EventType } from "../helpers/dataTypes";
import { formatEventTime } from "../helpers/timeHelpers";
interface EventLayoutProps {
    event: EventType;
    columnIndex: number;
    totalColumns: number;
    setEventToEdit: React.Dispatch<React.SetStateAction<EventType | null>>;
    startTime: Dayjs;
    dayStart: Dayjs;
    dayEnd: Dayjs;
}

const EventSpan: React.FC<EventLayoutProps> = ({
    event,
    columnIndex,
    totalColumns,
    setEventToEdit,
    dayEnd,
    dayStart,
}) => {
    const start = dayjs(event.startTime);
    const end = dayjs(event.endTime);

    // Determine the visible portion within the day
    const visibleStart = start.isBefore(dayStart) ? dayStart : start;
    const visibleEnd = end.isAfter(dayEnd) ? dayEnd : end;

    const startHour = visibleStart.hour() + visibleStart.minute() / 60;
    const endHour = visibleEnd.hour() + visibleEnd.minute() / 60;

    // Calculate top and height based on visible start/end times
    const top = startHour * 60;
    const height = (endHour - startHour) * 60;

    const totalGap = 2;
    const gapBetweenColumns = 2;

    const widthPercent = 1 / totalColumns;
    const leftPercent =
        columnIndex * widthPercent + gapBetweenColumns / window.innerWidth;

    return (
        <div
            onClick={() => setEventToEdit(event)}
            style={{
                position: "absolute",
                top,
                height,
                left: `${leftPercent * 100}%`,
                width: `calc(${widthPercent * 100}% - ${
                    totalGap * totalColumns
                }px)`,
                backgroundColor: "lightblue",
                border: "1px solid #999",
                borderRadius: "4px",
                padding: "2px",
                boxSizing: "border-box",
                overflow: "hidden",
                fontSize: "0.8em",
                cursor: "pointer",
            }}
        >
            <strong>{event.title}</strong>
            <div>{formatEventTime(event.startTime, event.endTime)}</div>
        </div>
    );
};

export default EventSpan;
