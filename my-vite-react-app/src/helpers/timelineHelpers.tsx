import { EventType } from "../helpers/dataTypes";
import dayjs from "dayjs";

export const getEventLayoutInfo = (
    event: EventType,
    processedEvents: {
        event: EventType;
        columnIndex: number;
        totalColumns: number;
    }[]
) => {
    const matchingEvent = processedEvents.find((e) => e.event.id === event.id);
    return {
        columnIndex: matchingEvent?.columnIndex || 0,
        totalColumns: matchingEvent?.totalColumns || 1,
    };
};

interface EventMapType {
    event: EventType;
    index: number;
    overlaps: Set<number>;
    columnIndex: number;
    totalColumns: number;
}

const getEventTimes = (eventWrapper: EventMapType) => {
    const start = dayjs(eventWrapper.event.startTime).valueOf();
    const end = dayjs(eventWrapper.event.endTime).valueOf();
    return { start, end };
};

const detectOverlaps = (eventMap: EventMapType[]) => {
    for (let i = 0; i < eventMap.length; i++) {
        const eAWrapper = eventMap[i];
        for (let j = i + 1; j < eventMap.length; j++) {
            const eBWrapper = eventMap[j];
            const { start: startA, end: endA } = getEventTimes(eAWrapper);
            const { start: startB, end: endB } = getEventTimes(eBWrapper);
            // Check overlap
            if (startA < endB && endA > startB) {
                eAWrapper.overlaps.add(eBWrapper.index);
                eBWrapper.overlaps.add(eAWrapper.index);
            }
        }
    }
};
const assignColumns = (eventMap: EventMapType[]) => {
    for (const current of eventMap) {
        const occupiedColumns = Array.from(current.overlaps).map(
            (otherIdx) => eventMap[otherIdx].columnIndex
        );

        // Find the smallest available column
        let colIdx = 0;
        while (occupiedColumns.includes(colIdx)) {
            colIdx++;
        }
        current.columnIndex = colIdx;
    }
};

const calculateTotalColumns = (eventMap: EventMapType[]) => {
    for (const current of eventMap) {
        const maxOverlapIndex = Math.max(
            current.columnIndex,
            ...Array.from(current.overlaps).map((i) => eventMap[i].columnIndex)
        );
        current.totalColumns = maxOverlapIndex + 1;
    }
};
export const assignEventColumns = (events: EventType[]) => {
    const eventMap = events.map((event, index) => ({
        event,
        index,
        overlaps: new Set<number>(),
        columnIndex: 0,
        totalColumns: 1,
    }));

    detectOverlaps(eventMap);
    assignColumns(eventMap);
    calculateTotalColumns(eventMap);

    return eventMap.map(({ event, columnIndex, totalColumns }) => ({
        event,
        columnIndex,
        totalColumns,
    }));
};
