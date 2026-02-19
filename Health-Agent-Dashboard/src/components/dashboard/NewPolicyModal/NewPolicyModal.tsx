import { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import SectionHeader from "./Sectionheader";
import { DatePicker } from "@mui/x-date-pickers";
import Toast from "../../common/Toast";
import { usePolicyForm } from "./usePolicyForm";

interface NewPolicyModalProps {
  open: boolean;
  onClose: () => void;
}

export default function NewPolicyModal({ open, onClose }: NewPolicyModalProps) {
  const {
    form,
    errors,
    isSubmitting,
    toastOpen,
    toastMessage,
    handleChange,
    fieldProps,
    handleSubmit,
    resetForm,
    closeToast,
    fetchPolicies,
  } = usePolicyForm(handleClose);

  function handleClose() {
    resetForm();
    onClose();
  }

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

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
            <SectionHeader label="Personal Information" />

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
                  textField: { fullWidth: true, ...fieldProps("dob") },
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
                  onBlur={() => fieldProps("gender").onBlur()}
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

            <SectionHeader label="Plan Details" />

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.planType}>
                <InputLabel>Plan Type</InputLabel>
                <Select
                  value={form.planType}
                  label="Plan Type"
                  onChange={(e) => handleChange("planType", e.target.value)}
                  onBlur={() => fieldProps("planType").onBlur()}
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

            <SectionHeader label="Additional Information" />

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.medicalConditions}>
                <InputLabel>Pre-existing Conditions</InputLabel>
                <Select
                  value={form.medicalConditions}
                  label="Pre-existing Conditions"
                  onChange={(e) =>
                    handleChange("medicalConditions", e.target.value)
                  }
                  onBlur={() => fieldProps("medicalConditions").onBlur()}
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
          onClose={closeToast}
        />
      </Dialog>
    </LocalizationProvider>
  );
}
