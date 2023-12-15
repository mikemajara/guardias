"use client";
import React, { useState } from "react";

import { CalendarComponent } from "@/components/calendar/calendar";
import { UserPanel } from "@/components/users/user-panel";
import { useUserStore } from "@/store/use-user-store";
import { Heading, Stack } from "@chakra-ui/react";

const Simple = () => {
  return (
    <Stack direction={{ base: "column", sm: "row" }} h="full">
      <Heading> Comming soon </Heading>
    </Stack>
  );
};

export default Simple;
