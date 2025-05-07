import styled from "styled-components";
import dayjs from "dayjs";

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Number = styled.span<{ isToday: boolean }>`
    font-weight: bold;
    font-size: 1.2em;
    color: ${({ isToday }) => (isToday ? "blue" : "inherit")};
`;

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
