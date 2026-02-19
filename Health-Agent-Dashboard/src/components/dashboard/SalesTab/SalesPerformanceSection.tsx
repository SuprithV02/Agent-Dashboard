import { Stack } from "@mui/material";
import { salesPerformanceData } from "../../../data/dashboardData";
import SectionCard from "../../common/SectionCard";
import GoalPieChart from "./GoalPieChart";
import LinearProgressBar from "./LinearProgressBar";

export default function SalesPerformanceSection() {
  const { monthlyGoal, plans } = salesPerformanceData;

  return (
    <SectionCard title="Sales Performance">
      <GoalPieChart value={monthlyGoal} />
      <Stack spacing={3}>
        {plans.map((plan) => (
          <LinearProgressBar key={plan.name} {...plan} />
        ))}
      </Stack>
    </SectionCard>
  );
}
