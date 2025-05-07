import React from "react";
import { Calendar, theme } from "antd";
import type { Dayjs } from "dayjs";

interface MonthCalendarProps {
    onSelect: (date: Dayjs) => void;
    selectedDate: Dayjs;
}

const MonthCalendar: React.FC<MonthCalendarProps> = (props) => {
    const { onSelect, selectedDate } = props;
    const { token } = theme.useToken();

    const wrapperStyle: React.CSSProperties = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        padding: "8px",
    };

    return (
        <div style={wrapperStyle}>
            <Calendar
                fullscreen={false}
                value={selectedDate}
                onSelect={onSelect}
            />
        </div>
    );
};

export default MonthCalendar;
