import type { SxProps, Theme } from "@mui/material/styles";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { Stack, Chip } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import type { KPI } from "../../types";

const TREND_COLORS = {
  positive: { base: "#1E3A8A", label: "deep blue" },
  negative: { base: "#475569", label: "slate" },
} as const;

interface TrendChipProps {
  change: KPI["change"];
  positive: KPI["positive"];
}

export default function TrendChip({ change, positive }: TrendChipProps) {
  const theme = useTheme();

  const chipStyles: SxProps<Theme> = (() => {
    if (positive === null) {
      return {
        bgcolor: alpha(theme.palette.grey[500], 0.1),
        color: theme.palette.grey[700],
      };
    }

    const { base } = positive ? TREND_COLORS.positive : TREND_COLORS.negative;
    return { bgcolor: alpha(base, 0.12), color: base };
  })();

  return (
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
      sx={{ fontWeight: 600, ...chipStyles }}
    />
  );
}
