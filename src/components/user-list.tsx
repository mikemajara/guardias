import { Stack } from "@chakra-ui/react";
import React from "react";
import { UserEntry } from "./user-entry";

export const UserList = () => {
  return (
    <Stack>
      <UserEntry></UserEntry>
      <UserEntry></UserEntry>
      <UserEntry></UserEntry>
    </Stack>
  );
};
