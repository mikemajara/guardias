import { format, startOfMonth } from "date-fns";
import { sample } from "lodash";
import React, { useEffect, useState } from "react";

import { assignCalendarDays } from "@/lib/helper-calendar";
import { Button, HStack, IconButton, Stack } from "@chakra-ui/react";

import { IconAdd, IconTrash } from "../icons";
import { UserEntry } from "./user-entry";
import { UserList } from "./user-list";

const USERS = [
  {
    name: "Bob",
    email: "bob@guardias.com",
  },
  {
    name: "Alice",
    email: "alice@guardias.com",
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
  const [users, setUsers] = useState<any>([]);
  const [assignments, setAssignments] = useState<any>([]);

  const handleClickAdd = (e: any) => {
    e.preventDefault();
    setUsers([...users, sample(USERS)]);
  };

  function handleClickDelete(i: React.Key | null | undefined): void {
    setUsers(
      users.filter((e: any, idx: React.Key | null | undefined) => idx != i)
    );
  }

  useEffect(() => {
    setAssignments(
      assignCalendarDays(
        users,
        format(startOfMonth(new Date()), "yyyy-MM-dd"),
        3
      )
    );
  }, [users]);

  useEffect(() => {
    onChangeEvents(assignments);
  }, [assignments]);

  return (
    <Stack>
      <pre>{JSON.stringify(assignments, null, 2)}</pre>
      <HStack>
        <Button rightIcon={<IconAdd />} onClick={handleClickAdd}>
          Add
        </Button>
      </HStack>
      <Stack>
        <HStack wrap={"wrap"}>
          {users.map((e: any, i: React.Key | null | undefined) => (
            <HStack key={i}>
              <UserEntry user={e} />
              <IconButton
                variant="ghost"
                size="sm"
                aria-label={"icon"}
                icon={<IconTrash />}
                onClick={() => handleClickDelete(i)}
              />
            </HStack>
          ))}
        </HStack>
      </Stack>
    </Stack>
  );
};
