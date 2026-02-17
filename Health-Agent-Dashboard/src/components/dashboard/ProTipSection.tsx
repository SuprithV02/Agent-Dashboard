import { Paper, Typography } from "@mui/material";

export default function ProTipSection() {
  return (
    <Paper
      sx={{
        p: 3,
        backgroundColor: "#e3f2fd",
      }}
    >
      <Typography fontWeight={600} mb={1}>
        Pro Tip: Open Enrollment
      </Typography>

      <Typography variant="body2">
        Focus on your "Quote Sent" leads this week. Conversion rates are 15%
        higher during the final week of the month.
      </Typography>
    </Paper>
  );
}
