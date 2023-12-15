import { format, startOfMonth } from "date-fns";
import { sample } from "lodash";
import React, { useEffect, useState } from "react";

import { useAllColorsToken } from "@/hooks/use-colors";
import { assignCalendarDays, Assignment } from "@/lib/helper-calendar";
import { User } from "@/store/types";
import { Restrictions } from "@/store/use-config-calendar-store";
import { useEventStore } from "@/store/use-event-store";
import { useUserStore } from "@/store/use-user-store";
import {
  Box,
  Button,
  chakra,
  HStack,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { EventApi } from "@fullcalendar/core/index.js";

import { IconAdd, IconArrowsSync, IconTrash } from "../icons";
import { FormUserAdd } from "./form-user-add";
import { UserEntry } from "./user-entry";
import { UserList } from "./user-list";

const USERS = [
  {
    name: "Alice",
    email: "alice@guardias.com",
  },
  {
    name: "Bob",
    email: "bob@guardias.com",
  },
  {
    name: "Carol",
    email: "carol@guardias.com",
  },
  {
    name: "Diana",
    email: "diana@guardias.com",
  },
  {
    name: "Earl",
    email: "earl@guardias.com",
  },
];

export const UserPanel = ({ onChangeEvents }: any) => {
  const { users } = useUserStore();
  const { setEvents } = useEventStore();
  const colors = useAllColorsToken();

  const assignmentToEvent = (e: Assignment): EventApi => {
    return {
      title: e.name,
      start: e.date,
      backgroundColor: colors[e?.color ?? "gray"][50],
      borderColor: colors[e?.color ?? "gray"][500],
      textColor: "black",
    } as unknown as EventApi;
  };

  const restrictions: Restrictions = {
    userRestriction: {
      minDaysBetweenAssignments: 2,
    },
    dateRestriction: {
      maxAssignmentsPerDay: 2,
    },
    mandatoryDayRestrictions: [
      { mandatoryDays: ["Sunday"] },
      { mandatoryDays: ["Friday", "Saturday"] },
    ],
  };
  const today = format(startOfMonth(new Date()), "yyyy-MM-dd");
  const assignDates = () => {
    let assignments = assignCalendarDays(users, today, 5, restrictions);
    setEvents(assignments.map(assignmentToEvent));
  };

  const handleClickGenerate = () => {
    assignDates();
  };

  return (
    <Stack>
      <Stack>
        <Button rightIcon={<IconArrowsSync />} onClick={handleClickGenerate}>
          Generar
        </Button>
        <FormUserAdd />
      </Stack>
      <Stack>
        {users.map((e: any, i: React.Key | null | undefined) => (
          <UserEntry key={i} user={e} />
        ))}
      </Stack>
    </Stack>
  );
};
