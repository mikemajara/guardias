"use client";
import React, { useState } from "react";

import { CalendarComponent } from "@/components/calendar/calendar";
import { UserPanel } from "@/components/users/user-panel";
import { useAllColorsToken } from "@/hooks/use-colors";
import { useEventStore } from "@/store/use-event-store";
import { useUserStore } from "@/store/use-user-store";
import { Stack } from "@chakra-ui/react";
import { EventAddArg, EventApi } from "@fullcalendar/core/index.js";

const Simple = () => {
  return (
    <Stack direction={{ base: "column", sm: "row" }} h="full">
      <Stack w={{ base: "full", sm: "25%" }}>
        <UserPanel />
      </Stack>
      <Stack w={{ base: "full", sm: "75%" }}>
        <CalendarComponent />
      </Stack>
    </Stack>
  );
};

export default Simple;
