import React from "react";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import { WrapperStyle } from "../helpers/componentStyles";
interface MonthCalendarProps {
    onSelect: (date: Dayjs) => void;
    selectedDate: Dayjs;
}

const MonthCalendar: React.FC<MonthCalendarProps> = (props) => {
    const { onSelect, selectedDate } = props;

    return (
        <WrapperStyle>
            <Calendar
                fullscreen={false}
                value={selectedDate}
                onSelect={onSelect}
            />
        </WrapperStyle>
    );
};

export default MonthCalendar;
