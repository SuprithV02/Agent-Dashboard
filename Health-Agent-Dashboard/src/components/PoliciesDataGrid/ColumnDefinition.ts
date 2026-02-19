import type { GridColDef } from "@mui/x-data-grid";

export const COLUMNS: GridColDef[] = [
  { field: "customer_name", headerName: "Customer Name", flex: 1 },
  { field: "dob", headerName: "DOB", flex: 1 },
  { field: "gender", headerName: "Gender", flex: 1 },
  { field: "mobile", headerName: "Mobile", flex: 1 },
  { field: "email", headerName: "Email", flex: 1.5 },
  { field: "address", headerName: "Address", flex: 2 },
  { field: "plan_type", headerName: "Plan Type", flex: 1 },
  { field: "pan_number", headerName: "PAN Number", flex: 1 },
  { field: "medical_conditions", headerName: "Medical Conditions", flex: 1 },
  { field: "nominee_name", headerName: "Nominee Name", flex: 1 },
  { field: "premium", headerName: "Premium", flex: 1 },
  { field: "policy_start_date", headerName: "Policy Start", flex: 1 },
];
