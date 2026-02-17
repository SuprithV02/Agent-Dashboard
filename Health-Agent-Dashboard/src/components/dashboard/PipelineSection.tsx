import { Box, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import SectionCard from "../common/SectionCard";
import { pipeline } from "../../data/dashboardData";

export default function PipelineSection() {
  const theme = useTheme();

  return (
    <SectionCard title="Sales Performance Funnel">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme.palette.grey[100], // light grey background
          borderRadius: 3, // curved edges
          px: 3,
          py: 2.5,
        }}
      >
        {pipeline.map((step, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              textAlign: "center",
            }}
          >
            {/* Number */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#000",
              }}
            >
              {step.value}
            </Typography>

            {/* Label */}
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.primary.light,
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              {step.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </SectionCard>
  );
}
