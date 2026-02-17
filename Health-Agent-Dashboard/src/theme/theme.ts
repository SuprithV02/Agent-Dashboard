import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f6f7f8",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
