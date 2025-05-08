import { render, screen, fireEvent } from "@testing-library/react";
import dayjs, { Dayjs } from "dayjs";
import AntdDateInput from "../components/AntdDateInput";

jest.mock("antd", () => {
    const ActualAntd = jest.requireActual("antd");
    return {
        ...ActualAntd,
        DatePicker: ({ value, onChange }: any) => (
            <input
                data-testid="mock-date-picker"
                value={value ? value.format("MM/DD/YYYY") : ""}
                onChange={(e) => {
                    // Parse the date from input for testing purposes
                    const date = e.target.value
                        ? dayjs(e.target.value, "MM/DD/YYYY")
                        : null;
                    onChange(date);
                }}
            />
        ),
    };
});

describe("AntdDateInput component", () => {
    let mockSetDateObj: jest.Mock<(date: Dayjs | null) => void>;

    beforeEach(() => {
        mockSetDateObj = jest.fn();
    });

    test("renders label and receives correct value", () => {
        const date = dayjs("2025-08-05", "YYYY-MM-DD");

        render(
            <AntdDateInput
                dateObj={date}
                setDateObj={mockSetDateObj}
                inputTitle="Select Date"
            />
        );

        // Verify label
        expect(screen.getByText("Select Date")).toBeInTheDocument();

        // Verify initial value
        const input = screen.getByTestId(
            "mock-date-picker"
        ) as HTMLInputElement;
        expect(input.value).toBe("08/05/2025");
    });

    test("calls setDateObj with new date on change", () => {
        render(
            <AntdDateInput
                dateObj={null}
                setDateObj={mockSetDateObj}
                inputTitle="Select Date"
            />
        );

        const input = screen.getByTestId(
            "mock-date-picker"
        ) as HTMLInputElement;

        // Simulate user changing the date
        fireEvent.change(input, { target: { value: "08/15/2025" } });

        // Check if setDateObj called with correct date object
        expect(mockSetDateObj).toHaveBeenCalledTimes(1);
        expect(mockSetDateObj).toHaveBeenCalledWith(
            dayjs("08/15/2025", "MM/DD/YYYY")
        );
    });
});
