export interface KPI {
  title: string;
  value: string;
  change: string;
  positive: boolean | null;
}

export interface PipelineStep {
  label: string;
  value: number;
}

export interface Renewal {
  customer: string;
  id: string;
  type: string;
  premium: string;
  due: string;
  status: string;
  color: "success" | "warning" | "error";
}

export interface Claim {
  id: string;
  status: string;
  color: "success" | "warning" | "default";
  customer: string;
}

export interface SalesPlan {
  name: string;
  revenue: number;
  progress: number; // percentage
}

export interface SalesPerformanceData {
  monthlyGoal: number;
  plans: SalesPlan[];
}

export interface Policy {
  id: number;
  customer_name: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;
  plan_type: string;
  pan_number: string;
  members_count: number;
  medical_conditions: boolean;
  nominee_name: string;
  premium: string;
  policy_start_date: string;
  agent_id: string;
}
