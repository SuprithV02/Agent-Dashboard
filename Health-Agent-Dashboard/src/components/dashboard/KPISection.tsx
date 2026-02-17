import { Grid } from "@mui/material";
import StatCard from "../common/StatCard";
import { kpis } from "../../data/dashboardData";

export default function KPISection() {
  return (
    <Grid container spacing={3} mb={4}>
      {kpis.map((kpi, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={index}>
          <StatCard {...kpi} />
        </Grid>
      ))}
    </Grid>
  );
}
