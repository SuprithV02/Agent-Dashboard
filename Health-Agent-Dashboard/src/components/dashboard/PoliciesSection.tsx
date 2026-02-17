"use client";

import {
  Grid,
  Typography,
  Chip,
  Paper,
  Stack,
  Box,
  Button,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import SectionCard from "../common/SectionCard";
import { usePolicyStore } from "../../store/policyStore";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const planStyles: Record<string, { bg: string; color: string }> = {
  Individual: {
    bg: alpha("#2563EB", 0.12),
    color: "#2563EB",
  },
  Family: {
    bg: alpha("#059669", 0.12),
    color: "#059669",
  },
};

export default function PoliciesSection() {
  const { policies } = usePolicyStore();
  const navigate = useNavigate();

  const topPolicies = policies.slice(0, 3);
  return (
    <SectionCard title="Recent Policies Issued">
      <Grid container spacing={3}>
        {topPolicies.map((policy) => {
          const planStyle = planStyles[policy.plan_type] || {
            bg: "#E5E7EB",
            color: "#374151",
          };

          return (
            <Grid key={policy.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
                {/* Header */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Policy #{policy.pan_number}
                  </Typography>

                  <Chip
                    size="small"
                    label={policy.plan_type}
                    sx={{
                      fontWeight: 600,
                      backgroundColor: planStyle.bg,
                      color: planStyle.color,
                    }}
                  />
                </Stack>

                {/* Customer */}
                <Box mb={2}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 0.5 }}
                  >
                    Customer
                  </Typography>

                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {policy.customer_name}
                  </Typography>
                </Box>

                {/* Premium & Members */}
                <Stack direction="row" justifyContent="space-between" mb={2}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Premium
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      ₹ {policy.premium}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Medical Conditions
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: policy.medical_conditions
                          ? "#B91C1C"
                          : "#059669",
                      }}
                    >
                      {policy.medical_conditions ? "Yes" : "No"}
                    </Typography>
                  </Box>
                </Stack>

                {/* Footer */}
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    Start Date:{" "}
                    {new Date(policy.policy_start_date).toLocaleDateString()}
                  </Typography>
                  <br />
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    mobile: {policy.mobile}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {policies.length > 3 && (
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            variant="text"
            endIcon={<ArrowForward />}
            onClick={() => navigate("/policies")}
          >
            View More
          </Button>
        </Box>
      )}
    </SectionCard>
  );
}
