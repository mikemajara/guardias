import { subDays } from "date-fns";
import React from "react";

import { getDatesInRange } from "@/lib/helper-dates";
import { useEventStore } from "@/store/use-event-store";
import { HStack, Icon, Text } from "@chakra-ui/react";
import esLocale from "@fullcalendar/core/locales/es";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";

import { IconCircle, IconCircleFill } from "../icons";

export const CalendarComponent = () => {
  const { events } = useEventStore();
  const onDateSelect = (selectionInfo: { start: any; end: any }) => {
    const { start, end } = selectionInfo;
    console.log(`SELECTED`, getDatesInRange(start, end));
  };

  return (
    <FullCalendar
      locale={esLocale}
      plugins={[dayGridPlugin, multiMonthPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable
      select={onDateSelect}
      dayCellClassNames={"day-header"}
      dayCellContent={(e) => (
        <HStack justify={"space-between"} flex={1}>
          <HStack spacing={1}>
            <Icon color="gray.200" fontSize={"xs"} as={IconCircleFill} />
            <Icon color="gray.200" fontSize={"xs"} as={IconCircle} />
            <Icon color="gray.200" fontSize={"xs"} as={IconCircle} />
          </HStack>
          <Text>{e.dayNumberText}</Text>
        </HStack>
      )}
      editable
      events={events}
    />
  );
};
