import React from "react";

import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";

export const CalendarComponent = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, multiMonthPlugin]}
      initialView="multiMonthYear"
      editable
      events={[
        { title: "event 1", date: "2019-04-01" },
        { title: "event 2", date: "2019-04-02" },
      ]}
    />
  );
};
