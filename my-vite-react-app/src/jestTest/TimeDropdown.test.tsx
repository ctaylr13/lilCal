import { render, screen } from "@testing-library/react";
import TimeDropdown from "../components/TimeDropdown";

describe("TimeDropdown Component", () => {
    const dropdownLabel = "Select Time";
    const allDayOption = false;
    let selectedTime = "";

    const mockSetSelectedTime = jest.fn((time) => {
        selectedTime = time;
    });

    beforeEach(() => {
        selectedTime = "";
        mockSetSelectedTime.mockClear();
    });

    test("renders with initial props", () => {
        render(
            <TimeDropdown
                dropdownLabel={dropdownLabel}
                selectedTime={selectedTime}
                setSelectedTime={mockSetSelectedTime}
                allDay={false}
            />
        );

        // Check if label options or placeholder appears
        expect(screen.getByDisplayValue(dropdownLabel)).toBeInTheDocument();
    });

    test("disables select when allDay is true", () => {
        render(
            <TimeDropdown
                dropdownLabel={dropdownLabel}
                selectedTime={selectedTime}
                setSelectedTime={mockSetSelectedTime}
                allDay={true}
            />
        );

        const select = screen.getByRole("combobox");
        expect(select).toBeDisabled();
    });
});
