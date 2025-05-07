import { EventType } from "../helpers/dataTypes";
import dayjs from "dayjs";

export const detectOverlaps = (
    eventMap: {
        event: EventType;
        index: number;
        overlaps: Set<number>;
        columnIndex: number;
        totalColumns: number;
    }[]
) => {
    for (let i = 0; i < eventMap.length; i++) {
        const eA = eventMap[i];
        const startA = dayjs(eA.event.startTime).valueOf();
        const endA = dayjs(eA.event.endTime).valueOf();

        for (let j = i + 1; j < eventMap.length; j++) {
            const eB = eventMap[j];
            const startB = dayjs(eB.event.startTime).valueOf();
            const endB = dayjs(eB.event.endTime).valueOf();

            // Check overlap
            if (startA < endB && endA > startB) {
                eA.overlaps.add(eB.index);
                eB.overlaps.add(eA.index);
            }
        }
    }
};
export const assignColumns = (
    eventMap: {
        event: EventType;
        index: number;
        overlaps: Set<number>;
        columnIndex: number;
        totalColumns: number;
    }[]
) => {
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

export const calculateTotalColumns = (
    eventMap: {
        event: EventType;
        index: number;
        overlaps: Set<number>;
        columnIndex: number;
        totalColumns: number;
    }[]
) => {
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
