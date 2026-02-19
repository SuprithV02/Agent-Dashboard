import { create } from "zustand";
import type { Policy } from "../types";

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
