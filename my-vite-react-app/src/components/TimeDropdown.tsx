import React from "react";

interface TimeDropdownProps {
    dropdownLabel: string;
    selectedTime: string;
    setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
    allDay?: boolean;
}

const TimeDropdown: React.FC<TimeDropdownProps> = (props) => {
    const { dropdownLabel, selectedTime, setSelectedTime, allDay } = props;

    // Create an array of time options in 12-hour format with AM/PM
    const timeOptions: string[] = Array.from(Array(24), (e, i) => {
        const hour = i % 12 === 0 ? 12 : i % 12; // Convert 0 to 12 for midnight and noon
        const ampm = i < 12 ? "AM" : "PM"; // Determine AM or PM
        return `${hour}:00 ${ampm}`; // Adjust format
    });
    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(event.target.value);
    };

    return (
        <div>
            <select
                id="time-select"
                value={selectedTime}
                onChange={handleTimeChange}
                disabled={allDay}
            >
                <option value="">{dropdownLabel}</option>
                {timeOptions.map((time, index) => (
                    <option key={index} value={time}>
                        {time}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TimeDropdown;
