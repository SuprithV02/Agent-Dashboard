import { Box, Typography } from "@mui/material";

export function WelcomeText() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={600}>
        Welcome, Suprith
      </Typography>
      <Typography color="text.secondary">
        Here's what's happening with your portfolio today.
      </Typography>
    </Box>
  );
}
