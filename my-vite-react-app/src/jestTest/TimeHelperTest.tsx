import { EventType } from "../helpers/dataTypes";
import {
    convertTo24Hour,
    filterEventsByTypeAndDate,
    formatEventTime,
    formatTime,
} from "../helpers/timeHelpers";
import dayjs from "dayjs";
describe("convertTo24Hour", () => {
    it("returns null for empty input", () => {
        expect(convertTo24Hour("")).toBeNull();
    });

    it("returns null for invalid time string", () => {
        expect(convertTo24Hour("invalid")).toBeNull();
    });

    it("converts valid 12-hour time to 24-hour format", () => {
        expect(convertTo24Hour("3:15 PM")).toBe("15:15");
        expect(convertTo24Hour("12:00 AM")).toBe("00:00");
        expect(convertTo24Hour("12:00 PM")).toBe("12:00");
    });
});

describe("formatTime", () => {
    it("formats valid date strings correctly", () => {
        expect(formatTime("2023-08-15T15:30:00")).toBe("3:30 PM");
        expect(formatTime("invalid-date")).toBe("");
    });
});

describe("formatEventTime", () => {
    it("returns formatted string for valid times", () => {
        expect(formatEventTime("2023-08-15T09:00", "2023-08-15T10:30")).toBe(
            "9:00 AM - 10:30 AM"
        );
    });
    it("returns empty string if startTime invalid", () => {
        expect(formatEventTime("invalid", "2023-08-15T10:30")).toBe("");
    });
    it("returns empty string if endTime invalid", () => {
        expect(formatEventTime("2023-08-15T09:00", "invalid")).toBe("");
    });
});

describe("filterEventsByTypeAndDate", () => {
    const mockDate = dayjs("2023-08-15");

    const events: EventType[] = [
        {
            id: "1",
            title: "All day event",
            startTime: "2023-08-15T08:00:00",
            endTime: "2023-08-15T20:00:00",
            startDay: "2023-08-15",
            endDay: "2023-08-15",
            allDay: true,
        },
        {
            id: "2",
            title: "Morning event",
            startTime: "2023-08-15T09:00:00",
            endTime: "2023-08-15T10:00:00",
            startDay: "2023-08-15",
            endDay: "2023-08-15",
            allDay: false,
        },
        {
            id: "3",
            title: "Evening event",
            startTime: "2023-08-15T18:00:00",
            endTime: "2023-08-15T19:00:00",
            startDay: "2023-08-15",
            endDay: "2023-08-15",
            allDay: false,
        },
    ];

    it("filters allDay events correctly with includeAllDay=true", () => {
        const result = filterEventsByTypeAndDate(events, mockDate, true);
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe("All day event");
    });

    it("filters non-allDay events correctly with includeAllDay=false", () => {
        const result = filterEventsByTypeAndDate(events, mockDate, false);
        expect(result).toHaveLength(2);
        const titles = result.map((e) => e.title);
        expect(titles).toContain("Morning event");
        expect(titles).toContain("Evening event");
    });
});
