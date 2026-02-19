import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { PipelineStep } from "../../../types";

export default function PipelineStep({ value, label }: PipelineStep) {
  const theme = useTheme();

  return (
    <Box sx={{ flex: 1, textAlign: "center" }}>
      <Typography variant="h6" fontWeight={700}>
        {value}
      </Typography>
      <Typography
        variant="caption"
        fontWeight={600}
        sx={{ color: theme.palette.primary.light, letterSpacing: 0.5 }}
      >
        {label}
      </Typography>
    </Box>
  );
}
