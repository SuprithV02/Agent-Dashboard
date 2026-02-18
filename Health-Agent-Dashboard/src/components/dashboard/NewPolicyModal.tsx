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
  Typography,
  Divider,
  CircularProgress,
  FormHelperText,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useCallback, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { usePolicyStore } from "../../store/policyStore";
import Toast from "../common/Toast";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NewPolicyModalProps {
  open: boolean;
  onClose: () => void;
}

type FormState = {
  customerName: string;
  dob: Dayjs | null;
  gender: string;
  mobile: string;
  email: string;
  address: string;
  planType: string;
  panNumber: string;
  medicalConditions: string;
  nomineeName: string;
  premium: string;
  policyStartDate: Dayjs | null;
  agentId: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_FORM: FormState = {
  customerName: "",
  dob: null,
  gender: "",
  mobile: "",
  email: "",
  address: "",
  planType: "",
  panNumber: "",
  medicalConditions: "",
  nomineeName: "",
  premium: "",
  policyStartDate: null,
  agentId: "AGENT-001",
};

// ─── Validation ───────────────────────────────────────────────────────────────

type Rule = (v: FormState) => string | undefined;

const RULES: Partial<Record<keyof FormState, Rule[]>> = {
  customerName: [(f) => (!f.customerName.trim() ? "Required." : undefined)],
  dob: [
    (f) => (!f.dob ? "Required." : undefined),
    (f) =>
      f.dob && !f.dob.isBefore(dayjs(), "day")
        ? "Must be in the past."
        : undefined,
  ],
  gender: [(f) => (!f.gender ? "Required." : undefined)],
  mobile: [
    (f) =>
      !f.mobile
        ? "Required."
        : !/^\d{10}$/.test(f.mobile)
          ? "Invalid 10-digit number."
          : undefined,
  ],
  email: [
    (f) =>
      !f.email
        ? "Required."
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)
          ? "Invalid email."
          : undefined,
  ],
  address: [(f) => (!f.address.trim() ? "Required." : undefined)],
  planType: [(f) => (!f.planType ? "Required." : undefined)],
  panNumber: [
    (f) =>
      !f.panNumber
        ? "Required."
        : !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(f.panNumber)
          ? "Invalid PAN (e.g. ABCDE1234F)."
          : undefined,
  ],
  medicalConditions: [(f) => (!f.medicalConditions ? "Required." : undefined)],
  nomineeName: [(f) => (!f.nomineeName.trim() ? "Required." : undefined)],
  premium: [
    (f) =>
      !f.premium ? "Required." : +f.premium <= 0 ? "Must be > 0." : undefined,
  ],
  policyStartDate: [
    (f) => (!f.policyStartDate ? "Required." : undefined),
    (f) =>
      f.policyStartDate?.isBefore(dayjs(), "day")
        ? "Cannot be in the past."
        : undefined,
  ],
};

function validate(form: FormState): FormErrors {
  return Object.entries(RULES).reduce<FormErrors>((errors, [key, rules]) => {
    const error = rules!.map((r) => r(form)).find(Boolean);
    if (error) errors[key as keyof FormState] = error;
    return errors;
  }, {});
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function NewPolicyModal({ open, onClose }: NewPolicyModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  const setPolicies = usePolicyStore((state) => state.setPolicies);
  const addPolicy = usePolicyStore((state) => state.addPolicy);

  const fetchPolicies = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3001/api/policies");
      const data = await res.json();
      setPolicies(data);
    } catch (err) {
      console.error("Failed to fetch policies:", err);
    }
  }, [setPolicies]);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  // Update a single field and clear its error
  const handleChange = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        if (!prev[key]) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    [],
  );

  // Validate a single field on blur
  const handleBlur = useCallback(
    (key: keyof FormState) => {
      const fieldErrors = validate(form);
      if (fieldErrors[key]) {
        setErrors((prev) => ({ ...prev, [key]: fieldErrors[key] }));
      }
    },
    [form],
  );

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    onClose();
  };

  const handleSubmit = async () => {
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...form,
        panNumber: form.panNumber.toUpperCase(),
        dob: form.dob?.format("YYYY-MM-DD"),
        policyStartDate: form.policyStartDate?.format("YYYY-MM-DD"),
      };

      const res = await fetch("http://localhost:3001/api/policies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setToastMessage(data.error || "Failed to create policy.");
        setToastOpen(true);
        return;
      }

      // Optimistic update — no refetch needed
      addPolicy(data);
      handleClose();
    } catch (err) {
      console.error(err);
      setToastMessage("Network error. Please try again.");
      setToastOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Helpers ──────────────────────────────────────────────────────────────

  const fieldProps = <K extends keyof FormState>(key: K) => ({
    error: !!errors[key],
    helperText: errors[key],
    onBlur: () => handleBlur(key),
  });

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={isSubmitting ? undefined : handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle sx={{ pb: 1, fontWeight: 600 }}>
          Create New Policy
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2.5}>
            {/* ── Section: Personal Info ─────────────────────────────── */}
            <Grid size={{ xs: 12 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
                textTransform="uppercase"
                letterSpacing={0.8}
              >
                Personal Information
              </Typography>
              <Divider sx={{ mt: 0.5, mb: 1 }} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Customer Name"
                fullWidth
                value={form.customerName}
                onChange={(e) => handleChange("customerName", e.target.value)}
                {...fieldProps("customerName")}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <DatePicker
                label="Date of Birth"
                value={form.dob}
                onChange={(v) => handleChange("dob", v)}
                disableFuture
                slotProps={{
                  textField: {
                    fullWidth: true,
                    ...fieldProps("dob"),
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={form.gender}
                  label="Gender"
                  onChange={(e) => handleChange("gender", e.target.value)}
                  onBlur={() => handleBlur("gender")}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {errors.gender && (
                  <FormHelperText>{errors.gender}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Mobile"
                type="tel"
                fullWidth
                inputProps={{ maxLength: 10 }}
                value={form.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                {...fieldProps("mobile")}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                {...fieldProps("email")}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Address"
                fullWidth
                multiline
                rows={3}
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                {...fieldProps("address")}
              />
            </Grid>

            {/* ── Section: Plan Details ──────────────────────────────── */}
            <Grid size={{ xs: 12 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
                textTransform="uppercase"
                letterSpacing={0.8}
              >
                Plan Details
              </Typography>
              <Divider sx={{ mt: 0.5, mb: 1 }} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.planType}>
                <InputLabel>Plan Type</InputLabel>
                <Select
                  value={form.planType}
                  label="Plan Type"
                  onChange={(e) => handleChange("planType", e.target.value)}
                  onBlur={() => handleBlur("planType")}
                >
                  <MenuItem value="Individual">Individual</MenuItem>
                  <MenuItem value="Family">Family</MenuItem>
                  <MenuItem value="Senior Citizen">Senior Citizen</MenuItem>
                </Select>
                {errors.planType && (
                  <FormHelperText>{errors.planType}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="PAN Number"
                fullWidth
                inputProps={{
                  maxLength: 10,
                  style: { textTransform: "uppercase" },
                }}
                value={form.panNumber}
                onChange={(e) =>
                  handleChange("panNumber", e.target.value.toUpperCase())
                }
                {...fieldProps("panNumber")}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Premium (₹)"
                type="number"
                fullWidth
                inputProps={{ min: 1 }}
                value={form.premium}
                onChange={(e) => handleChange("premium", e.target.value)}
                {...fieldProps("premium")}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <DatePicker
                label="Policy Start Date"
                value={form.policyStartDate}
                onChange={(v) => handleChange("policyStartDate", v)}
                disablePast
                slotProps={{
                  textField: {
                    fullWidth: true,
                    ...fieldProps("policyStartDate"),
                  },
                }}
              />
            </Grid>

            {/* ── Section: Additional Info ───────────────────────────── */}
            <Grid size={{ xs: 12 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
                textTransform="uppercase"
                letterSpacing={0.8}
              >
                Additional Information
              </Typography>
              <Divider sx={{ mt: 0.5, mb: 1 }} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.medicalConditions}>
                <InputLabel>Pre-existing Conditions</InputLabel>
                <Select
                  value={form.medicalConditions}
                  label="Pre-existing Conditions"
                  onChange={(e) =>
                    handleChange("medicalConditions", e.target.value)
                  }
                  onBlur={() => handleBlur("medicalConditions")}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
                {errors.medicalConditions && (
                  <FormHelperText>{errors.medicalConditions}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Nominee Name"
                fullWidth
                value={form.nomineeName}
                onChange={(e) => handleChange("nomineeName", e.target.value)}
                {...fieldProps("nomineeName")}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Agent ID"
                fullWidth
                disabled
                value={form.agentId}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "action.disabledBackground",
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : null
            }
          >
            {isSubmitting ? "Creating..." : "Create Policy"}
          </Button>
        </DialogActions>

        <Toast
          open={toastOpen}
          message={toastMessage}
          severity="error"
          onClose={() => setToastOpen(false)}
        />
      </Dialog>
    </LocalizationProvider>
  );
}
