import _ from "lodash";

import { colors } from "@/theme/colors";
import { getToken, useToken } from "@chakra-ui/react";

const grades = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];

export const useColorToken = (color: string) => {
  const colorTokens = useToken(
    "colors",
    grades.map((g) => `${color}.${g}`)
  );

  return {
    50: colorTokens[0],
    100: colorTokens[1],
    200: colorTokens[2],
    300: colorTokens[3],
    400: colorTokens[4],
    500: colorTokens[5],
    600: colorTokens[6],
    700: colorTokens[7],
    800: colorTokens[8],
    900: colorTokens[9],
  };
};

export const useAllColorsToken = () => {
  return {
    gray: useColorToken("gray"),
    red: useColorToken("red"),
    orange: useColorToken("orange"),
    yellow: useColorToken("yellow"),
    green: useColorToken("green"),
    teal: useColorToken("teal"),
    blue: useColorToken("blue"),
    cyan: useColorToken("cyan"),
    purple: useColorToken("purple"),
    pink: useColorToken("pink"),
    whiteAlpha: useColorToken("whiteAlpha"),
  };
};
