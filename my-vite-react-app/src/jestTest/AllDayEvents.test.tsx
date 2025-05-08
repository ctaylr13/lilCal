import { render, screen, fireEvent } from "@testing-library/react";
import { EventType } from "../helpers/dataTypes";
import AllDayEvents from "../components/AllDayEvents";

// Sample data for testing
const mockEvents: EventType[] = [
    { id: "1", title: "Event 1", startTime: "10:00", endTime: "11:00" },
    { id: "2", title: "Event 2", startTime: "12:00", endTime: "13:00" },
];

describe("AllDayEvents component", () => {
    let setAllDay: jest.Mock<{}>;
    let setEventToEdit: jest.Mock<{}>;

    beforeEach(() => {
        setAllDay = jest.fn();
        setEventToEdit = jest.fn();
    });

    test("renders list of all-day events", () => {
        render(
            <AllDayEvents
                allDayEvents={mockEvents}
                setAllDay={setAllDay}
                setEventToEdit={setEventToEdit}
            />
        );

        // Check if the container title appears
        expect(screen.getByText("All Day Events")).toBeInTheDocument();

        // Check if each event title is rendered
        mockEvents.forEach((event) => {
            expect(screen.getByText(event.title)).toBeInTheDocument();
        });
    });

    test("clicking an event triggers setAllDay and setEventToEdit", () => {
        render(
            <AllDayEvents
                allDayEvents={mockEvents}
                setAllDay={setAllDay}
                setEventToEdit={setEventToEdit}
            />
        );

        const eventElement = screen.getByText("Event 1");

        // Simulate clicking on the event
        fireEvent.click(eventElement);

        // Verify the callbacks are called with correct arguments
        expect(setAllDay).toHaveBeenCalledWith(true);
        expect(setEventToEdit).toHaveBeenCalledWith({
            ...mockEvents[0],
            startTime: "",
            endTime: "",
        });
    });
});
