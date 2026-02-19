import { useNavigate } from "react-router-dom";
import { usePolicyStore } from "../../../store/policyStore";
import { useCallback } from "react";
import SectionCard from "../../common/SectionCard";
import { Box, Button, Grid } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import PolicyCard from "./PolicyCard";

const TOP_POLICIES_LIMIT = 3;

export default function PoliciesSection() {
  const { policies } = usePolicyStore();
  const navigate = useNavigate();

  const topPolicies = policies.slice(0, TOP_POLICIES_LIMIT);
  const goToPolicies = useCallback(() => navigate("/policies"), [navigate]);

  return (
    <SectionCard title="Recent Policies Issued">
      <Grid container spacing={3}>
        {topPolicies.map((policy) => (
          <Grid key={policy.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <PolicyCard {...policy} />
          </Grid>
        ))}
      </Grid>

      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button
          variant="text"
          endIcon={<ArrowForward />}
          onClick={goToPolicies}
        >
          View More
        </Button>
      </Box>
    </SectionCard>
  );
}
