import { EventType } from "../helpers/dataTypes";
import {
    assignEventColumns,
    getEventLayoutInfo,
} from "../helpers/timelineHelpers";

describe("getEventLayoutInfo", () => {
    const event: EventType = {
        id: "1",
        title: "Test Event",
        startTime: "2023-08-15T09:00:00",
        endTime: "2023-08-15T10:00:00",
        startDay: "2023-08-15",
        endDay: "2023-08-15",
        allDay: false,
    };

    const processedEvents = [{ event, columnIndex: 1, totalColumns: 3 }];

    it("returns correct layout info for existing event", () => {
        const info = getEventLayoutInfo(event, processedEvents);
        expect(info).toEqual({ columnIndex: 1, totalColumns: 3 });
    });

    it("returns default info for non-existing event", () => {
        const unknownEvent = { ...event, id: "unknown" };
        const info = getEventLayoutInfo(unknownEvent, processedEvents);
        expect(info).toEqual({ columnIndex: 0, totalColumns: 1 });
    });
});

describe("assignEventColumns and related functions", () => {
    const events: EventType[] = [
        {
            id: "1",
            title: "Event 1",
            startTime: "2023-08-15T09:00:00",
            endTime: "2023-08-15T10:00:00",
            startDay: "2023-08-15",
            endDay: "2023-08-15",
            allDay: false,
        },
        {
            id: "2",
            title: "Event 2 overlapping 1",
            startTime: "2023-08-15T09:30:00",
            endTime: "2023-08-15T10:30:00",
            startDay: "2023-08-15",
            endDay: "2023-08-15",
            allDay: false,
        },
        {
            id: "3",
            title: "Event 3 no overlap",
            startTime: "2023-08-15T11:00:00",
            endTime: "2023-08-15T12:00:00",
            startDay: "2023-08-15",
            endDay: "2023-08-15",
            allDay: false,
        },
    ];

    it("correctly detects overlaps", () => {
        const result = assignEventColumns(events);
        // Check that overlapping events have same totalColumns and different columnIndex
        const event1 = result.find((e) => e.event.id === "1");
        const event2 = result.find((e) => e.event.id === "2");
        const event3 = result.find((e) => e.event.id === "3");
        expect(event1?.columnIndex).not.toBe(event2?.columnIndex);
        expect(event1?.totalColumns).toEqual(2);
        expect(event2?.totalColumns).toEqual(2);
        expect(event3?.totalColumns).toEqual(1);
    });

    it("assigns correct columnIndex after detecting overlaps", () => {
        const result = assignEventColumns(events);
        // Check that non-overlapping events can share column 0, overlapping have different columns
        const event1 = result.find((e) => e.event.id === "1")!;
        const event2 = result.find((e) => e.event.id === "2")!;
        expect(event1.columnIndex).not.toEqual(event2.columnIndex);
    });

    it("computes totalColumns correctly", () => {
        const result = assignEventColumns(events);
        const event1 = result.find((e) => e.event.id === "1")!;
        const event2 = result.find((e) => e.event.id === "2")!;
        const event3 = result.find((e) => e.event.id === "3")!;
        expect(event1.totalColumns).toBe(2); // overlaps with event 2
        expect(event2.totalColumns).toBe(2);
        expect(event3.totalColumns).toBe(1);
    });
});
