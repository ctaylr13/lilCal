import dayjs from "dayjs";
import {
    DateDisplayContainer,
    DateNumber,
    DayText,
} from "../helpers/componentStyles";

const DateDisplay = ({ selectedDate }: { selectedDate: dayjs.Dayjs }) => {
    const isToday = selectedDate.isSame(dayjs(), "day");

    return (
        <DateDisplayContainer>
            <DateNumber $isToday={isToday}>
                {selectedDate.format("D")}
            </DateNumber>
            <DayText $isToday={isToday}>{selectedDate.format("dddd")}</DayText>
        </DateDisplayContainer>
    );
};

export default DateDisplay;
