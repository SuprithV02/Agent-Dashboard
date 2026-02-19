import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { usePolicyStore } from "../../store/policyStore";
import type { Policy } from "../../types";
import { COLUMNS } from "./ColumnDefinition";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
const DEFAULT_PAGE_SIZE = 25;

const CONTAINER_SX = {
  width: "100vw",
  height: "100vh",
  p: 2,
  bgcolor: "background.default",
  display: "flex",
  flexDirection: "column",
} as const;

function toLocalDate(date: string): string {
  return new Date(date).toLocaleDateString();
}

function mapPolicyToRow(policy: Policy) {
  return {
    id: policy.id,
    customer_name: policy.customer_name,
    dob: toLocalDate(policy.dob),
    gender: policy.gender,
    mobile: policy.mobile,
    email: policy.email,
    address: policy.address,
    plan_type: policy.plan_type,
    pan_number: policy.pan_number,
    medical_conditions: policy.medical_conditions ? "Yes" : "No",
    nominee_name: policy.nominee_name,
    premium: `₹ ${policy.premium}`,
    policy_start_date: toLocalDate(policy.policy_start_date),
  };
}

export default function AllPoliciesPage() {
  const { policies } = usePolicyStore();
  const navigate = useNavigate();

  const rows = useMemo(() => policies.map(mapPolicyToRow), [policies]);
  const goBack = useCallback(() => navigate(-1), [navigate]);

  return (
    <Box sx={CONTAINER_SX}>
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={goBack}
        sx={{ mb: 2, alignSelf: "flex-start" }}
      >
        Back
      </Button>

      <DataGrid
        rows={rows}
        columns={COLUMNS}
        initialState={{
          pagination: { paginationModel: { pageSize: DEFAULT_PAGE_SIZE } },
        }}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        disableRowSelectionOnClick
        sx={{ flex: 1 }}
      />
    </Box>
  );
}
