import {
  Box,
  Typography,
  CircularProgress,
  LinearProgress,
  Stack,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import SectionCard from "../common/SectionCard";
import { salesPerformanceData } from "../../data/dashboardData";

export default function SalesPerformanceSection() {
  const { monthlyGoal, plans } = salesPerformanceData;

  return (
    <SectionCard title="Sales Performance">
      {/* Circular Goal Indicator */}
      <Box display="flex" justifyContent="center" mb={5}>
        <Box position="relative" display="inline-flex">
          {/* Background Track */}
          <CircularProgress
            variant="determinate"
            value={100}
            size={150}
            thickness={4}
            sx={{
              color: (theme) => alpha(theme.palette.primary.main, 0.12),
              position: "absolute",
            }}
          />

          {/* Actual Progress */}
          <CircularProgress
            variant="determinate"
            value={monthlyGoal}
            size={150}
            thickness={4}
            sx={{
              color: "primary.light", // Professional corporate blue
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />

          {/* Center Content */}
          <Box
            position="absolute"
            top={0}
            left={0}
            bottom={0}
            right={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              {monthlyGoal}%
            </Typography>
            <Typography
              variant="caption"
              sx={{
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "text.secondary",
              }}
            >
              Monthly Goal
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Plan Breakdown */}
      <Stack spacing={3}>
        {plans.map((plan) => (
          <Box key={plan.name}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                {plan.name}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "black",
                }}
              >
                ${plan.revenue / 1000}k
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={plan.progress}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.08),
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  backgroundColor: "#0D9488", // Teal for performance
                },
              }}
            />
          </Box>
        ))}
      </Stack>
    </SectionCard>
  );
}
