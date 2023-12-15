import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({
  // borderRadius: 0, // disable the border radius
  // fontWeight: "normal", // change the font weight to normal
  // fontFamily: "mono", // change the font family to monospaced
});

const sizes = {
  md: defineStyle({
    // fontSize: "sm", // Change font size to sm (14px)
  }),
};

// Defining a custom variant
const customVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    fontWeight: "medium",
    borderRadius: "14px",
    borderWidth: 2,
    borderColor: "gray.900",
    bg: `${c}.50`,
    _dark: {
      bg: `${c}.200`,
      color: "gray.800",
    },

    _hover: {
      bg: `${c}.200`,

      _dark: {
        bg: `${c}.300`,
      },
    },

    _active: {
      bg: `${c}.700`,

      _dark: {
        bg: `${c}.400`,
      },
    },
  };
});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    theme: customVariant,
  },
  defaultProps: {
    // colorScheme: "purple", // set the default color scheme to purple
    variant: "theme",
    size: "md",
  },
});
