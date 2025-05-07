import React from "react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface AntdDateInputProps {
    dateObj: Dayjs | null; // Instead of string
    setDateObj: (date: Dayjs | null) => void;
    inputTitle: string;
}

const AntdDateInput: React.FC<AntdDateInputProps> = ({
    dateObj,
    setDateObj,
    inputTitle,
}) => {
    const handleChange = (date: Dayjs | null) => {
        setDateObj(date);
    };

    return (
        <div>
            <label>{inputTitle}</label>
            <DatePicker
                placeholder="MM/DD/YYYY"
                value={dateObj}
                onChange={handleChange}
                format="MM/DD/YYYY"
            />
        </div>
    );
};

export default AntdDateInput;
