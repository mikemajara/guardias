import Image from "next/image";
import React from "react";

import { Avatar, Button, HStack, Link, Text } from "@chakra-ui/react";

const MenuButton = ({ label, href }: any) => {
  return (
    <Button>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export const Navbar = () => {
  const menuItems = [
    { label: "Simple", href: "/simple" },
    { label: "Colaborativo", href: "/colaborativo" },
  ];
  return (
    <HStack justify={"space-between"} bg="gray.50" p={2} shadow={"md"}>
      <HStack>
        <Image
          src="/images/logo.png"
          alt="logo"
          objectFit="contain"
          width={48}
          height={48}
        />
      </HStack>
      <HStack>
        <HStack>
          {menuItems.map((e, i) => (
            <MenuButton key={i} {...e} />
          ))}
        </HStack>
        <Avatar name="Belen Martínez" />
      </HStack>
    </HStack>
  );
};
