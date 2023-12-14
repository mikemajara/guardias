import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

import { borderColor, borderStyle, borderWidth } from "./defaults";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    // backgroundColor: "#e7e7e7",
  },
  header: {
    // paddingBottom: "2px",
  },
  body: {
    // paddingTop: "2px",
  },
  footer: {
    // paddingTop: "2px",
  },
});

const sizes = {
  md: definePartsStyle({
    container: {
      // borderRadius: "0px",
    },
  }),
};

// define custom styles for funky variant
const variants = {
  theme: (props: any) =>
    definePartsStyle({
      container: {
        borderWidth,
        borderStyle,
        borderColor,
        borderRadius: "10px",
        bg: props.colorMode === "dark" ? "gray.900" : "white",
      },
    }),
};

// define which sizes and variants are applied by default
const defaultProps = {
  // in this example, we will set the default size and variant
  // size: "xl",
  variant: "theme",
};

export const cardTheme = defineMultiStyleConfig({
  // baseStyle,
  // sizes,
  variants,
  // defaultProps,
});
