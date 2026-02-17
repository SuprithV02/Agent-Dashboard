import { Paper, Typography, Stack, Chip, Box } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { alpha, useTheme } from "@mui/material/styles";
import type { KPI } from "../../data/dashboardData";

export default function StatCard({ title, value, change, positive }: KPI) {
  const theme = useTheme();

  const getChipStyles = () => {
    if (positive === null) {
      return {
        bgcolor: alpha(theme.palette.grey[500], 0.1),
        color: theme.palette.grey[700],
      };
    }

    return positive
      ? {
          bgcolor: alpha("#1E3A8A", 0.12), // deep blue tint
          color: "#1E3A8A",
        }
      : {
          bgcolor: alpha("#475569", 0.12), // slate
          color: "#475569",
        };
  };

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
      {/* Top: Value + Percentage */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
          }}
        >
          {value}
        </Typography>

        <Chip
          size="small"
          label={
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {positive !== null &&
                (positive ? (
                  <TrendingUp fontSize="small" />
                ) : (
                  <TrendingDown fontSize="small" />
                ))}
              <span>{change}</span>
            </Stack>
          }
          sx={{
            fontWeight: 600,
            ...getChipStyles(),
          }}
        />
      </Stack>

      {/* Bottom: Title */}
      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: theme.palette.text.secondary,
          fontWeight: 500,
          letterSpacing: 0.4,
        }}
      >
        {title}
      </Typography>
    </Paper>
  );
}
