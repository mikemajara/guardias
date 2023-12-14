"use client";
import Image from "next/image";
import { useState } from "react";

import { CalendarComponent } from "@/components/calendar/calendar";
import { UserPanel } from "@/components/users/user-panel";
// import styles from "./page.module.scss";
import { chakra, HStack, Stack } from "@chakra-ui/react";

export default function Home() {
  const [events, setEvents] = useState<any>({});
  const handleEventChange = (assignments: any[]) => {
    setEvents(
      assignments.map((e: any) => ({
        name: e.name,
        title: e.email,
        start: e.date,
      }))
    );
  };
  return (
    <Stack border="2px solid black" minH="100vh">
      <Stack>
        <UserPanel onChangeEvents={handleEventChange} />
      </Stack>
      <Stack>
        <CalendarComponent events={events} />
      </Stack>
    </Stack>
  );
}
