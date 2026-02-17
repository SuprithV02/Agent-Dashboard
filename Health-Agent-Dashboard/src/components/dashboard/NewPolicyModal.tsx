"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { usePolicyStore } from "../../store/policyStore";

interface NewPolicyModalProps {
  open: boolean;
  onClose: () => void;
}

const initialFormState = {
  customerName: "",
  dob: null as Dayjs | null,
  gender: "",
  mobile: "",
  email: "",
  address: "",
  planType: "",
  panNumber: "",
  membersCount: "",
  medicalConditions: "",
  nomineeName: "",
  premium: "",
  policyStartDate: null as Dayjs | null,
  agentId: "AGENT-001",
};

export default function NewPolicyModal({ open, onClose }: NewPolicyModalProps) {
  const [form, setForm] = useState(initialFormState);

  const setPolicies = usePolicyStore((state) => state.setPolicies);
  const addPolicy = usePolicyStore((state) => state.addPolicy);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        dob: form.dob?.format("YYYY-MM-DD"),
        policyStartDate: form.policyStartDate?.format("YYYY-MM-DD"),
      };

      const res = await fetch("http://localhost:3001/api/policies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create policy");

      await fetchPolicies();

      setForm(initialFormState);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPolicies = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/policies");
      const data = await res.json();
      setPolicies(data);
    } catch (err) {
      console.error("Failed to fetch policies:", err);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Create New Policy</DialogTitle>

        <DialogContent>
          <Grid container spacing={3} mt={1}>
            {/* Customer Name */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Customer Name"
                fullWidth
                value={form.customerName}
                onChange={(e) => handleChange("customerName", e.target.value)}
              />
            </Grid>

            {/* DOB */}
            <Grid size={{ xs: 12, md: 6 }}>
              <DatePicker
                label="Date of Birth"
                value={form.dob}
                onChange={(v) => handleChange("dob", v)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            {/* Gender */}
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={form.gender}
                  label="Gender"
                  onChange={(e) => handleChange("gender", e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Mobile */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Mobile"
                type="tel"
                fullWidth
                value={form.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
              />
            </Grid>

            {/* Email */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Grid>

            {/* Address */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Address"
                fullWidth
                multiline
                rows={3}
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </Grid>

            {/* Plan Type */}
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Plan Type</InputLabel>
                <Select
                  value={form.planType}
                  label="Plan Type"
                  onChange={(e) => handleChange("planType", e.target.value)}
                >
                  <MenuItem value="Individual">Individual</MenuItem>
                  <MenuItem value="Family">Family</MenuItem>
                  <MenuItem value="Senior Citizen">Senior Citizen</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Sum Insured */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="PAN Number"
                type="text"
                fullWidth
                value={form.panNumber}
                onChange={(e) => handleChange("panNumber", e.target.value)}
              />
            </Grid>

            {/* Members Count */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Members Count"
                type="number"
                fullWidth
                value={form.membersCount}
                onChange={(e) => handleChange("membersCount", e.target.value)}
              />
            </Grid>

            {/* Medical Conditions */}
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Medical Conditions</InputLabel>
                <Select
                  value={form.medicalConditions}
                  label="Medical Conditions"
                  onChange={(e) =>
                    handleChange("medicalConditions", e.target.value)
                  }
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Nominee Name */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Nominee Name"
                fullWidth
                value={form.nomineeName}
                onChange={(e) => handleChange("nomineeName", e.target.value)}
              />
            </Grid>

            {/* Premium */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Premium"
                type="number"
                fullWidth
                value={form.premium}
                onChange={(e) => handleChange("premium", e.target.value)}
              />
            </Grid>

            {/* Policy Start Date */}
            <Grid size={{ xs: 12, md: 6 }}>
              <DatePicker
                label="Policy Start Date"
                value={form.policyStartDate}
                onChange={(v) => handleChange("policyStartDate", v)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            {/* Agent ID */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Agent ID"
                fullWidth
                disabled
                value={form.agentId}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Create Policy
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
