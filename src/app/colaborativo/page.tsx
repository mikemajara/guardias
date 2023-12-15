"use client";
import React, { useState } from "react";

import { CalendarComponent } from "@/components/calendar/calendar";
import { UserPanel } from "@/components/users/user-panel";
import { useUserStore } from "@/store/use-user-store";
import { Heading, Stack } from "@chakra-ui/react";

const Simple = () => {
  const [events, setEvents] = useState<any>({});
  const { users } = useUserStore();
  const handleEventChange = (assignments: any[]) => {
    setEvents(
      assignments.map((e: any) => ({
        name: e.name,
        title: e.name,
        start: e.date,
      }))
    );
  };
  return (
    <Stack direction={{ base: "column", sm: "row" }} h="full">
      <Heading> Comming soon </Heading>
      {/* <Stack w={{ base: "full", sm: "25%" }}>
        <UserPanel onChangeEvents={handleEventChange} />
      </Stack>
      <Stack w={{ base: "full", sm: "75%" }}>
        <CalendarComponent events={events} />
      </Stack> */}
    </Stack>
  );
};

export default Simple;
