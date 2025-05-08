import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import DateDisplay from "../components/DateDisplay";

describe("DateDisplay", () => {
    const today = dayjs(); // current date
    const yesterday = today.subtract(1, "day");

    test("displays today correctly and applies isToday styles", () => {
        render(<DateDisplay selectedDate={today} />);

        // Check date number and day name for today
        expect(screen.getByText(today.format("D"))).toBeInTheDocument();
        expect(screen.getByText(today.format("dddd"))).toBeInTheDocument();
    });

    test("displays a different date correctly and applies non-today styles", () => {
        render(<DateDisplay selectedDate={yesterday} />);

        expect(screen.getByText(yesterday.format("D"))).toBeInTheDocument();
        expect(screen.getByText(yesterday.format("dddd"))).toBeInTheDocument();
    });
});
