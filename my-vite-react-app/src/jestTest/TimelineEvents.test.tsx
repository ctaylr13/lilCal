import { render, screen, fireEvent } from "@testing-library/react";
import dayjs from "dayjs";
import { EventType } from "../helpers/dataTypes";
import TimelineEvents from "../components/TimelineEvents";

// Mock helper functions
jest.mock("../helpers/timelineHelpers", () => ({
    assignEventColumns: jest.fn((events: EventType[]) => events),
    getEventLayoutInfo: jest.fn((event: EventType, processedEvents: any) => ({
        columnIndex: 0,
        totalColumns: 1,
    })),
}));

describe("TimelineEvents", () => {
    const mockSetEventToEdit = jest.fn();

    const eventDate = dayjs("2023-08-15T00:00");

    const mockEvents: EventType[] = [
        {
            id: "e1",
            title: "Event 1",
            startTime: "2023-08-15T09:00",
            endTime: "2023-08-15T10:00",
        },
        {
            id: "e2",
            title: "Event 2",
            startTime: "2023-08-15T13:00",
            endTime: "2023-08-15T14:30",
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders events and clicking triggers setEventToEdit", () => {
        // Update the mock helpers to assign column info
        require("../helpers/timelineHelpers").assignEventColumns = jest.fn(
            (events: EventType[]) => events
        );
        require("../helpers/timelineHelpers").getEventLayoutInfo = jest.fn(
            (event: EventType) => ({ columnIndex: 0, totalColumns: 1 })
        );

        render(
            <TimelineEvents
                events={mockEvents}
                setEventToEdit={mockSetEventToEdit}
                eventDate={eventDate}
            />
        );

        // Each event should render
        mockEvents.forEach((event) => {
            expect(screen.getByText(event.title)).toBeInTheDocument();

            // Simulate click
            const eventDiv = screen.getByText(event.title).closest("div");
            fireEvent.click(eventDiv!);
            expect(mockSetEventToEdit).toHaveBeenCalledWith(event);
        });
    });
});
