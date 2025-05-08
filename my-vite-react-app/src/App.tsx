import { useState, useEffect } from "react";
import { Skeleton } from "antd";
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
import { filterEventsByTypeAndDate } from "./helpers/timeHelpers.tsx";

const App = () => {
    const today = dayjs();
    const [dataLoading, setDataLoading] = useState(true);
    const [events, setEvents] = useState<EventType[]>([]);
    const [eventToEdit, setEventToEdit] = useState<EventType | null>(null);
    const [selectedDate, setSelectedDate] = useState<Dayjs>(today);
    const [allDay, setAllDay] = useState<boolean>(false);
    const [eventName, setEventName] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const eventDate = selectedDate || today;
    const eventDateObj = dayjs(eventDate);

    const [startDateObj, setStartDateObj] = useState<Dayjs | null>(
        eventDateObj
    );
    const [endDateObj, setEndDateObj] = useState<Dayjs | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchEvents(setEvents);
            setDataLoading(false);
        }, 1500);
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        const newDateObj = dayjs(eventDate);
        setStartDateObj(newDateObj);
        setEndDateObj(newDateObj);
    }, [selectedDate]);

    const onSelect = (date: Dayjs) => {
        setSelectedDate(date);
    };

    const nonAllDayEvents = filterEventsByTypeAndDate(events, eventDate, false);
    const allDayEvents = filterEventsByTypeAndDate(events, eventDate, true);

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
                    eventDate={eventDate}
                    allDay={allDay}
                    setAllDay={setAllDay}
                    setEvents={setEvents}
                    eventToEdit={eventToEdit}
                    setEventToEdit={setEventToEdit}
                    eventName={eventName}
                    setEventName={setEventName}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                    startDateObj={startDateObj}
                    setStartDateObj={setStartDateObj}
                    endDateObj={endDateObj}
                    setEndDateObj={setEndDateObj}
                />
                <MonthCalendar
                    selectedDate={selectedDate}
                    onSelect={onSelect}
                />
            </SideNav>
            <ContentWrapper>
                {dataLoading ? (
                    <Skeleton />
                ) : (
                    <Timeline
                        allDayEvents={allDayEvents}
                        setAllDay={setAllDay}
                        eventDate={eventDate}
                        setEventToEdit={setEventToEdit}
                        events={nonAllDayEvents}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                )}
            </ContentWrapper>
        </Box>
    );
};

export default App;
