import styled from "styled-components";
import dayjs from "dayjs";

// Example React component

// Styled component
const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 8px; /* spacing between number and day */
`;

// Style for the number
const Number = styled.span<{ isToday: boolean }>`
    font-weight: bold;
    font-size: 1.2em;
    color: ${({ isToday }) => (isToday ? "blue" : "inherit")};
`;

// Style for the day name
const DayText = styled.span<{ isToday: boolean }>`
    color: ${({ isToday }) => (isToday ? "blue" : "inherit")};
`;

const DateDisplay = ({ selectedDate }: { selectedDate: dayjs.Dayjs }) => {
    const isToday = selectedDate.isSame(dayjs(), "day");

    return (
        <Container>
            <Number isToday={isToday}>{selectedDate.format("D")}</Number>
            <DayText isToday={isToday}>{selectedDate.format("dddd")}</DayText>
        </Container>
    );
};

export default DateDisplay;
