"use client";
import React, { useState } from "react";

import { CalendarComponent } from "@/components/calendar/calendar";
import { UserPanel } from "@/components/users/user-panel";
import { useAllColorsToken } from "@/hooks/use-colors";
import { useUserStore } from "@/store/use-user-store";
import { Stack } from "@chakra-ui/react";

const Simple = () => {
  const [events, setEvents] = useState<any>({});
  const { users } = useUserStore();
  const colors = useAllColorsToken();
  const handleEventChange = (assignments: any[]) => {
    console.log(`SETTING EVENTS`, assignments);
    setEvents(
      assignments.map((e: any) => ({
        name: e.name,
        title: e.name,
        start: e.date,
        backgroundColor: colors[e.color][50],
        borderColor: e.color,
        textColor: "black",
      }))
    );
  };
  return (
    <Stack direction={{ base: "column", sm: "row" }} h="full">
      <Stack w={{ base: "full", sm: "25%" }}>
        <UserPanel onChangeEvents={handleEventChange} />
      </Stack>
      <Stack w={{ base: "full", sm: "75%" }}>
        <CalendarComponent events={events} />
      </Stack>
    </Stack>
  );
};

export default Simple;
