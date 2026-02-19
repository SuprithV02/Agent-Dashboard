import { useTheme } from "@mui/material/styles";
import SectionCard from "../../common/SectionCard";
import { Box } from "@mui/material";
import { pipeline } from "../../../data/dashboardData";
import PipelineStep from "./PipelineStep";

const CONTAINER_SX = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 3,
  px: 3,
  py: 2.5,
};

export default function PipelineSection() {
  const theme = useTheme();

  return (
    <SectionCard title="Sales Performance Funnel">
      <Box sx={{ ...CONTAINER_SX, bgcolor: theme.palette.grey[100] }}>
        {pipeline.map((step) => (
          <PipelineStep key={step.label} {...step} />
        ))}
      </Box>
    </SectionCard>
  );
}
