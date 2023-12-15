// import styles from "./page.module.scss";
import { Stack } from "@chakra-ui/react";

export default function Home({ children }: any) {
  return (
    <Stack p={5} minH="100vh">
      {children}
    </Stack>
  );
}
