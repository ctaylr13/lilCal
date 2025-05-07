import { useState, useEffect } from "react";
import InputHeader from "./components/InputHeader.tsx";
import { EventType } from "./helpers/dataTypes.tsx";
import Timeline from "./components/Timeline.tsx";
import MonthCalendar from "./components/MonthCalendar.tsx";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import DateToggle from "./components/DateToggle.tsx";

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
    const [events, setEvents] = useState<EventType[]>([]);

    const [eventToEdit, setEventToEdit] = useState<EventType | null>(null);
    const today = dayjs();
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

    useEffect(() => {
        const fetchData = () => {
            fetch("http://localhost:3000/events")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `Network response was not ok: ${response.statusText}`
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    setEvents(data);
                })
                .catch((error) => {
                    console.error("Error fetching events:", error);
                });
        };

        fetchData();
    }, []);
    useEffect(() => {
        const newDate = selectedDate || today;
        const newDateObj = dayjs(newDate);
        setStartDateStr(newDateObj.format("MM/DD/YYYY"));
        setStartDateObj(newDateObj);

        setEndDateStr(newDateObj.format("MM/DD/YYYY"));
        setEndDateObj(newDateObj);
    }, [selectedDate]);

    const [endDateStr, setEndDateStr] = useState<string>("");
    const [endDateObj, setEndDateObj] = useState<Dayjs | null>(null);

    const nonAllDayEvents = filterNonAllDayEvents(
        events,
        endDateObj,
        eventDateObj
    );

    const allDayEvents = filterAllDayEvents(events, eventDateObj);

    const onSelect = (date: Dayjs) => {
        setSelectedDate(date);
    };

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
                    todaysDate={today}
                    setAllDay={setAllDay}
                    eventDate={eventDate}
                    setEventToEdit={setEventToEdit}
                    setSelectedDate={setSelectedDate}
                    selectedDate={selectedDate}
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
