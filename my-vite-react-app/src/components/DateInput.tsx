import React, { ChangeEvent } from "react";
import dayjs, { Dayjs } from "dayjs";

interface DateInputProps {
    dateStr: string;
    setDateStr: (value: string) => void;
    setDateObj: (date: Dayjs | null) => void;
    inputTitle: string;
}

const DateInput: React.FC<DateInputProps> = ({
    dateStr,
    setDateStr,
    inputTitle,
    setDateObj,
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        const digits = value.replace(/\D/g, "");
        const limitedDigits = digits.slice(0, 8);
        let formatted = "";
        if (limitedDigits.length > 0) {
            formatted += limitedDigits.substring(0, 2);
        }
        if (limitedDigits.length > 2) {
            formatted += "/" + limitedDigits.substring(2, 4);
        }
        if (limitedDigits.length > 4) {
            formatted += "/" + limitedDigits.substring(4, 8);
        }

        setDateStr(formatted);
        // Parse date if complete
        if (limitedDigits.length === 8) {
            const month = limitedDigits.substring(0, 2);
            const day = limitedDigits.substring(2, 4);
            const year = limitedDigits.substring(4, 8);

            const parsedDate = dayjs(`${month}/${day}/${year}`);
            if (parsedDate.isValid()) {
                setDateObj(parsedDate);
            } else {
                setDateObj(null);
            }
        } else {
            setDateObj(null);
        }
    };

    return (
        <div>
            <label>{inputTitle}</label>
            <input
                type="text"
                placeholder="MM/DD/YYYY"
                value={dateStr}
                onChange={handleChange}
                maxLength={10}
            />
        </div>
    );
};

export default DateInput;
