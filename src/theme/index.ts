import { extendTheme } from "@chakra-ui/react";

import { buttonTheme } from "./button";
import { cardTheme } from "./card";
import { colors } from "./colors";

export const theme = extendTheme({
  fonts: {
    heading: "var(--font-kalnia)",
    body: "var(--font-rubik)",
  },
  colors,
  components: { Card: cardTheme, Button: buttonTheme },
});
