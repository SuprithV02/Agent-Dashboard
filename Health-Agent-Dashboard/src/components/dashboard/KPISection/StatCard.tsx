import { Paper, Typography, Stack } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import TrendChip from "../../common/TrendChip";
import type { KPI } from "../../../types";

export default function StatCard({ title, value, change, positive }: KPI) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: alpha(theme.palette.primary.light, 0.05),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: theme.shadows[3],
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={700}>
          {value}
        </Typography>
        <TrendChip change={change} positive={positive} />
      </Stack>

      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: "text.secondary",
          fontWeight: 500,
          letterSpacing: 0.4,
        }}
      >
        {title}
      </Typography>
    </Paper>
  );
}
