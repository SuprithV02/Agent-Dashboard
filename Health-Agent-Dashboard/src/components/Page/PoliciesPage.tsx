import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { usePolicyStore } from "../../store/policyStore";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // for react-router navigation

const columns = [
  { field: "customer_name", headerName: "Customer Name", flex: 1 },
  { field: "dob", headerName: "DOB", flex: 1 },
  { field: "gender", headerName: "Gender", flex: 1 },
  { field: "mobile", headerName: "Mobile", flex: 1 },
  { field: "email", headerName: "Email", flex: 1.5 },
  { field: "address", headerName: "Address", flex: 2 },
  { field: "plan_type", headerName: "Plan Type", flex: 1 },
  { field: "pan_number", headerName: "PAN Number", flex: 1 },
  { field: "members_count", headerName: "Members", flex: 1 },
  { field: "medical_conditions", headerName: "Medical Conditions", flex: 1 },
  { field: "nominee_name", headerName: "Nominee Name", flex: 1 },
  { field: "premium", headerName: "Premium", flex: 1 },
  { field: "policy_start_date", headerName: "Policy Start", flex: 1 },
];

export default function AllPoliciesPage() {
  const { policies } = usePolicyStore();
  const navigate = useNavigate(); // react-router hook

  const rows = policies.map((policy) => ({
    id: policy.id,
    customer_name: policy.customer_name,
    dob: new Date(policy.dob).toLocaleDateString(),
    gender: policy.gender,
    mobile: policy.mobile,
    email: policy.email,
    address: policy.address,
    plan_type: policy.plan_type,
    pan_number: policy.pan_number,
    members_count: policy.members_count,
    medical_conditions: policy.medical_conditions ? "Yes" : "No",
    nominee_name: policy.nominee_name,
    premium: `₹ ${policy.premium}`,
    policy_start_date: new Date(policy.policy_start_date).toLocaleDateString(),
  }));

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        p: 2,
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        sx={{ mb: 2, alignSelf: "flex-start" }}
        variant="outlined"
        onClick={() => navigate(-1)} // go back to previous page
      >
        Back
      </Button>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[10, 25, 50, 100]}
        disableSelectionOnClick
        sx={{ flex: 1 }}
      />
    </Box>
  );
}
