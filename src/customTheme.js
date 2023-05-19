import { extendTheme } from "@chakra-ui/react"

const customTheme = extendTheme({
  styles: {
    global: {
      "nav a": {
        display: "inline-block",
        padding: "1rem",
        textDecoration: "none",
        color: "inherit",
        fontWeight: "bold",
        borderBottom: "2px solid transparent",
        transition: "all 0.2s",
        _hover: {
          borderBottomColor: "currentColor",
        },
      },
      "nav a.active": {
        borderBottomColor: "currentColor",
      },
    },
  },
})

export default customTheme
