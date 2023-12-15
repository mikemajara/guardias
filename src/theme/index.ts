import { extendTheme } from "@chakra-ui/react";

import { buttonTheme } from "./button";
import { cardTheme } from "./card";
import { primary, secondary } from "./colors";

export const theme = extendTheme({
  fonts: {
    heading: "var(--font-kalnia)",
    body: "var(--font-rubik)",
  },
  colors: { primary, secondary },
  components: { Card: cardTheme, Button: buttonTheme },
});
