"use client";
import Image from "next/image";
import { useState } from "react";

import { CalendarComponent } from "@/components/calendar/calendar";
import { UserPanel } from "@/components/users/user-panel";
import { useUserStore } from "@/store/use-user-store";
// import styles from "./page.module.scss";
import { Box, chakra, HStack, Stack } from "@chakra-ui/react";

export default function Home() {
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
    <Stack border="2px solid black" minH="100vh">
      <Stack direction={{ base: "column", sm: "row" }} h="full">
        <Stack w={{ base: "full", sm: "25%" }}>
          <UserPanel onChangeEvents={handleEventChange} />
        </Stack>
        <Stack w={{ base: "full", sm: "75%" }}>
          <CalendarComponent events={events} />
        </Stack>
      </Stack>
      <Box w="50%">
        <chakra.pre>{JSON.stringify(users)}</chakra.pre>
      </Box>
    </Stack>
  );
}
