import React from "react";

import { User } from "@/store/types";
import { useUserStore } from "@/store/use-user-store";
import { HStack, Icon, IconButton, Text } from "@chakra-ui/react";

import { IconCross, IconTrash } from "../icons";

export const UserEntry = ({ user }: any) => {
  const { removeUser } = useUserStore();

  function handleClickDelete(e: User): void {
    if (e.id) removeUser(e.id);
  }
  return (
    <HStack
      p={2}
      justify={"space-between"}
      bg={user.color + ".50"}
      borderRadius={"lg"}
    >
      <Text>{user.name}</Text>
      <IconButton
        variant="ghost"
        size="sm"
        aria-label={"icon"}
        icon={<Icon as={IconCross} color="red.500" />}
        onClick={() => handleClickDelete(user)}
      />
    </HStack>
  );
};
