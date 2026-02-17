import { Grid, Typography, Chip, Paper, Stack, Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import SectionCard from "../common/SectionCard";
import { claims } from "../../data/dashboardData";

const statusStyles: Record<string, { bg: string; color: string }> = {
  Open: {
    bg: alpha("#4F46E5", 0.12),
    color: "#4F46E5",
  },
  "In Review": {
    bg: alpha("#D97706", 0.12),
    color: "#D97706",
  },
  Approved: {
    bg: alpha("#059669", 0.12),
    color: "#059669",
  },
  Rejected: {
    bg: alpha("#B91C1C", 0.12),
    color: "#B91C1C",
  },
};

export default function ClaimsSection() {
  return (
    <SectionCard title="Recent Claims Assistance">
      <Grid container spacing={3}>
        {claims.map((claim) => {
          const statusStyle = statusStyles[claim.status] || {
            bg: "#E5E7EB",
            color: "#374151",
          };

          return (
            <Grid size={{ xs: 12, md: 4 }} key={claim.id}>
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
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Claim #{claim.id}
                  </Typography>

                  <Chip
                    size="small"
                    label={claim.status}
                    sx={{
                      fontWeight: 600,
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color,
                    }}
                  />
                </Stack>

                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mb: 0.5,
                    }}
                  >
                    Customer
                  </Typography>

                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {claim.customer}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </SectionCard>
  );
}
