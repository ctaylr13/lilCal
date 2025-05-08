import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import TimelineHours from "../components/TimelineHours";

describe("TimelineHours", () => {
    const mockSetEventToEdit = jest.fn();
    const eventDate = dayjs("2023-08-15T00:00");

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders 24 hour blocks with correct labels", () => {
        render(
            <TimelineHours
                setEventToEdit={mockSetEventToEdit}
                eventDate={eventDate}
            />
        );
        const labelTexts = Array.from({ length: 24 }, (_, i) => {
            const displayHour = i % 12 || 12;
            const amPm = i < 12 ? "AM" : "PM";
            return `${displayHour}:00 ${amPm}`;
        });
        labelTexts.forEach((text) => {
            expect(screen.getByText(text)).toBeInTheDocument();
        });
    });
});
