import React from "react";

import { Stack } from "@chakra-ui/react";

import { UserEntry } from "./user-entry";

export const UserList = ({ users }: any) => {
  return (
    <Stack>
      {users.map((e: any, i: React.Key | null | undefined) => (
        <UserEntry key={i} user={e} />
      ))}
    </Stack>
  );
};
