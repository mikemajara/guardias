import React from "react";

import esLocale from "@fullcalendar/core/locales/es";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";

export const CalendarComponent = ({ events }: any) => {
  return (
    <FullCalendar
      locale={esLocale}
      plugins={[dayGridPlugin, multiMonthPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      editable
      events={events}
    />
  );
};
