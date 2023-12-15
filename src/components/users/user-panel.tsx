import { format, startOfMonth } from "date-fns";
import { sample } from "lodash";
import React, { useEffect, useState } from "react";

import { useAllColorsToken } from "@/hooks/use-colors";
import { assignCalendarDays, Assignment } from "@/lib/helper-calendar";
import { User } from "@/store/types";
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
  const [assignments, setAssignments] = useState<any>([]);
  const colors = useAllColorsToken();

  const assignmentToEvent = (e: Assignment) => {
    return {
      name: e.name,
      title: e.name,
      start: e.date,
      backgroundColor: e?.color ? colors[e.color][50] : "gray",
      borderColor: e.color,
      textColor: "black",
    };
  };

  const assignDates = () => {
    let assignments = assignCalendarDays(
      users,
      format(startOfMonth(new Date()), "yyyy-MM-dd"),
      5,
      {
        userRestriction: {
          minDaysBetweenAssignments: 2,
        },
        dateRestriction: {
          maxAssignmentsPerDay: 2,
        },
      }
    );
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
