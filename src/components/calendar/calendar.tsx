import React from "react";

import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";

export const CalendarComponent = ({ events }: any) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, multiMonthPlugin]}
      initialView="dayGridMonth"
      editable
      events={events}
    />
  );
};
