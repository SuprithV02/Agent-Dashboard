import { create } from "zustand";

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

interface PolicyStore {
  policies: Policy[];
  setPolicies: (policies: Policy[]) => void;
  addPolicy: (policy: Policy) => void;
}

export const usePolicyStore = create<PolicyStore>((set) => ({
  policies: [],

  // Overwrite all policies (used after GET)
  setPolicies: (policies) => set({ policies }),

  // Add a single policy (optional, if you want to just push after POST)
  addPolicy: (policy) =>
    set((state) => ({ policies: [...state.policies, policy] })),
}));
