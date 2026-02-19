import { alpha, Box, LinearProgress, Typography } from "@mui/material";
import type { SalesPlan } from "../../../types";
import type { Theme } from "@mui/material/styles";

const PROGRESS_COLOR = "#0D9488";

const LINEAR_PROGRESS_SX = {
  height: 8,
  borderRadius: 5,
  backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: PROGRESS_COLOR,
  },
};

export default function LinearProgressBar({
  name,
  revenue,
  progress,
}: SalesPlan) {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="body2" fontWeight={500}>
          {name}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          ${revenue / 1000}k
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={LINEAR_PROGRESS_SX}
      />
    </Box>
  );
}
