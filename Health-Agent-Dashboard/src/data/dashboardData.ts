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

export const kpis: KPI[] = [
  { title: "Policies Sold", value: "142", change: "12%", positive: true },
  {
    title: "Premium Collected",
    value: "$1.2M",
    change: "8.4%",
    positive: true,
  },
  { title: "Active Leads", value: "48", change: "3%", positive: false },
  { title: "Conversion Rate", value: "24.2%", change: "4.1%", positive: true },
  { title: "Renewals Due", value: "18", change: "Today", positive: null },
];

export const pipeline: PipelineStep[] = [
  { label: "New", value: 124 },
  { label: "Contacted", value: 86 },
  { label: "Qualified", value: 52 },
  { label: "Quote Sent", value: 31 },
  { label: "Converted", value: 18 },
];

export const renewals: Renewal[] = [
  {
    customer: "Sarah Jenkins",
    id: "#POL-8821",
    type: "Individual PPO",
    premium: "$420.00",
    due: "Oct 24, 2023",
    status: "Pending",
    color: "warning",
  },
  {
    customer: "Robert Fox",
    id: "#POL-4412",
    type: "Family HMO",
    premium: "$890.00",
    due: "Oct 26, 2023",
    status: "Grace Period",
    color: "error",
  },
  {
    customer: "Maria Garcia",
    id: "#POL-1099",
    type: "Medicare Advantage",
    premium: "$150.00",
    due: "Oct 30, 2023",
    status: "Renewed",
    color: "success",
  },
];

export const claims: Claim[] = [
  {
    id: "#CLM-1204",
    status: "In Review",
    color: "warning",
    customer: "David Chen",
  },
  {
    id: "#CLM-0988",
    status: "Approved",
    color: "success",
    customer: "Alice Wong",
  },
  {
    id: "#CLM-1152",
    status: "Rejected",
    color: "default",
    customer: "Tom Baker",
  },
];

export const salesPerformanceData: SalesPerformanceData = {
  monthlyGoal: 85,
  plans: [
    {
      name: "HMO Premium Plans",
      revenue: 42000,
      progress: 75,
    },
    {
      name: "PPO Standard Plans",
      revenue: 28000,
      progress: 50,
    },
    {
      name: "Medicare Advantage",
      revenue: 12000,
      progress: 30,
    },
  ],
};
