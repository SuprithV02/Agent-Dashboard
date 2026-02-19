import { Grid } from "@mui/material";
import SectionCard from "../../common/SectionCard";
import { claims } from "../../../data/dashboardData";
import ClaimCard from "./ClaimCard";

export default function ClaimsSection() {
  return (
    <SectionCard title="Recent Claims Assistance">
      <Grid container spacing={3}>
        {claims.map((claim) => (
          <Grid size={{ xs: 12, md: 4 }} key={claim.id}>
            <ClaimCard {...claim} />
          </Grid>
        ))}
      </Grid>
    </SectionCard>
  );
}
