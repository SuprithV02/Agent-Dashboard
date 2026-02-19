import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { Claim } from "../../../types";

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Open: { bg: alpha("#4F46E5", 0.12), color: "#4F46E5" },
  "In Review": { bg: alpha("#D97706", 0.12), color: "#D97706" },
  Approved: { bg: alpha("#059669", 0.12), color: "#059669" },
  Rejected: { bg: alpha("#B91C1C", 0.12), color: "#B91C1C" },
};

const DEFAULT_STATUS_STYLE = { bg: "#E5E7EB", color: "#374151" };

export default function ClaimCard({ id, status, customer }: Claim) {
  const statusStyle = STATUS_STYLES[status] ?? DEFAULT_STATUS_STYLE;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="subtitle2" fontWeight={600}>
          Claim #{id}
        </Typography>
        <Chip
          size="small"
          label={status}
          sx={{
            fontWeight: 600,
            backgroundColor: statusStyle.bg,
            color: statusStyle.color,
          }}
        />
      </Stack>

      <Box>
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          Customer
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          {customer}
        </Typography>
      </Box>
    </Paper>
  );
}
