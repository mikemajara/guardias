import { extendTheme } from "@chakra-ui/react";
import { primary, secondary } from "./colors";
import { cardTheme } from "./card";
import { buttonTheme } from "./button";

export const theme = extendTheme({
  colors: { primary, secondary },
  components: { Card: cardTheme, Button: buttonTheme },
});
