import { useState, useEffect } from "react";
import InputHeader from "./components/InputHeader.tsx";
import { EventType } from "./helpers/dataTypes.tsx";
import Timeline from "./components/Timeline.tsx";
import MonthCalendar from "./components/MonthCalendar.tsx";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import DateToggle from "./components/DateToggle.tsx";
import { fetchEvents } from "./helpers/eventHelpers.tsx";

import {
    WideOvalButton,
    Box,
    TopBar,
    SideNav,
    ContentWrapper,
} from "./helpers/componentStyles.tsx";
import {
    filterAllDayEvents,
    filterNonAllDayEvents,
} from "./helpers/timeHelpers.tsx";

const App = () => {
    const today = dayjs();

    const [events, setEvents] = useState<EventType[]>([]);
    const [eventToEdit, setEventToEdit] = useState<EventType | null>(null);
    const [selectedDate, setSelectedDate] = useState<Dayjs>(today);
    const [allDay, setAllDay] = useState<boolean>(false);
    const [eventName, setEventName] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const eventDate = selectedDate || today;
    const eventDateObj = dayjs(eventDate);
    const [startDateStr, setStartDateStr] = useState<string>(
        eventDateObj.format("MM/DD/YYYY")
    );
    const [startDateObj, setStartDateObj] = useState<Dayjs | null>(
        eventDateObj
    );
    const [endDateStr, setEndDateStr] = useState<string>("");
    const [endDateObj, setEndDateObj] = useState<Dayjs | null>(null);

    useEffect(() => {
        fetchEvents(setEvents);
    }, []);

    useEffect(() => {
        const newDate = selectedDate || today;
        const newDateObj = dayjs(newDate);
        setStartDateStr(newDateObj.format("MM/DD/YYYY"));
        setStartDateObj(newDateObj);
        setEndDateStr(newDateObj.format("MM/DD/YYYY"));
        setEndDateObj(newDateObj);
    }, [selectedDate]);

    const onSelect = (date: Dayjs) => {
        setSelectedDate(date);
    };
    const nonAllDayEvents = filterNonAllDayEvents(
        events,
        endDateObj,
        eventDateObj
    );
    const allDayEvents = filterAllDayEvents(events, eventDateObj);

    return (
        <Box>
            <TopBar>
                <WideOvalButton
                    disabled={selectedDate === today}
                    onClick={() => setSelectedDate(today)}
                >
                    Today
                </WideOvalButton>
                <DateToggle
                    setAllDay={setAllDay}
                    eventDate={eventDate}
                    setEventToEdit={setEventToEdit}
                    setSelectedDate={setSelectedDate}
                />
            </TopBar>
            <SideNav>
                <InputHeader
                    allDay={allDay}
                    setAllDay={setAllDay}
                    setEvents={setEvents}
                    eventToEdit={eventToEdit}
                    setEventToEdit={setEventToEdit}
                    eventDate={eventDate}
                    eventName={eventName}
                    setEventName={setEventName}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                    startDateStr={startDateStr}
                    setStartDateStr={setStartDateStr}
                    startDateObj={startDateObj}
                    setStartDateObj={setStartDateObj}
                    endDateStr={endDateStr}
                    setEndDateStr={setEndDateStr}
                    endDateObj={endDateObj}
                    setEndDateObj={setEndDateObj}
                />
                <MonthCalendar
                    selectedDate={selectedDate}
                    onSelect={onSelect}
                />
            </SideNav>
            <ContentWrapper>
                <Timeline
                    allDayEvents={allDayEvents}
                    setAllDay={setAllDay}
                    eventDate={eventDate}
                    setEventToEdit={setEventToEdit}
                    events={nonAllDayEvents}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            </ContentWrapper>
        </Box>
    );
};

export default App;
