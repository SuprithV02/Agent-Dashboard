import { Box, CircularProgress, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

const CIRCULAR_SIZE = 150;
const CIRCULAR_THICKNESS = 4;

const CENTER_BOX_SX = {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

export default function GoalPieChart({ value }: { value: number }) {
  return (
    <Box display="flex" justifyContent="center" mb={5}>
      <Box position="relative" display="inline-flex">
        {/* Background Track */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={CIRCULAR_SIZE}
          thickness={CIRCULAR_THICKNESS}
          sx={{
            color: (theme) => alpha(theme.palette.primary.main, 0.12),
            position: "absolute",
          }}
        />

        {/* Actual Progress */}
        <CircularProgress
          variant="determinate"
          value={value}
          size={CIRCULAR_SIZE}
          thickness={CIRCULAR_THICKNESS}
          sx={{
            color: "primary.light",
            "& .MuiCircularProgress-circle": { strokeLinecap: "round" },
          }}
        />

        {/* Center Label */}
        <Box sx={CENTER_BOX_SX}>
          <Typography variant="h5" fontWeight={700}>
            {value}%
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ letterSpacing: 1, textTransform: "uppercase" }}
          >
            Monthly Goal
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
