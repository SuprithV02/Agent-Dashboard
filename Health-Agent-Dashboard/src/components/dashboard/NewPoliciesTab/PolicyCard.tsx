import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { Policy } from "../../../types";

const PAPER_SX = {
  p: 3,
  borderRadius: 3,
  border: "1px solid #E5E7EB",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: 3,
  },
};

const PLAN_STYLES: Record<string, { bg: string; color: string }> = {
  Individual: { bg: alpha("#2563EB", 0.12), color: "#2563EB" },
  Family: { bg: alpha("#059669", 0.12), color: "#059669" },
};

const DEFAULT_PLAN_STYLE = { bg: "#E5E7EB", color: "#374151" };

export default function PolicyCard({
  pan_number,
  plan_type,
  customer_name,
  premium,
  medical_conditions,
  policy_start_date,
  mobile,
}: Policy) {
  const planStyle = PLAN_STYLES[plan_type] ?? DEFAULT_PLAN_STYLE;
  const hasMedicalConditions = Boolean(medical_conditions);

  return (
    <Paper elevation={0} sx={PAPER_SX}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="subtitle2" fontWeight={600}>
          Policy #{pan_number}
        </Typography>
        <Chip
          size="small"
          label={plan_type}
          sx={{
            fontWeight: 600,
            backgroundColor: planStyle.bg,
            color: planStyle.color,
          }}
        />
      </Stack>

      {/* Customer */}
      <Box mb={2}>
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          Customer
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          {customer_name}
        </Typography>
      </Box>

      {/* Premium & Medical Conditions */}
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Premium
          </Typography>
          <Typography fontWeight={600}>₹ {premium}</Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary">
            Medical Conditions
          </Typography>
          <Typography
            fontWeight={600}
            sx={{ color: hasMedicalConditions ? "#B91C1C" : "#059669" }}
          >
            {hasMedicalConditions ? "Yes" : "No"}
          </Typography>
        </Box>
      </Stack>

      {/* Footer */}
      <Box>
        <Typography variant="caption" color="text.secondary" display="block">
          Start Date: {new Date(policy_start_date).toLocaleDateString()}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          Mobile: {mobile}
        </Typography>
      </Box>
    </Paper>
  );
}
