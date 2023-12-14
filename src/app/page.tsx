"use client";
import Image from "next/image";

import { CalendarComponent } from "@/components/calendar/calendar";
// import styles from "./page.module.scss";
import { chakra, HStack, Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Stack border="2px solid black" minH="100vh">
      <Stack>
        <span>Usuarios</span>
      </Stack>
      <Stack>
        <CalendarComponent />
      </Stack>
    </Stack>
  );
}
