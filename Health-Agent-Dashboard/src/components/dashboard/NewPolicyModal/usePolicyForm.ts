import type { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import { usePolicyStore } from "../../../store/policyStore";
import dayjs from "dayjs";

export type FormState = {
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

export type FormErrors = Partial<Record<keyof FormState, string>>;

export const INITIAL_FORM: FormState = {
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

export function usePolicyForm(onSuccess: () => void) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  const setPolicies = usePolicyStore((s) => s.setPolicies);
  const addPolicy = usePolicyStore((s) => s.addPolicy);

  const fetchPolicies = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3001/api/policies");
      const data = await res.json();
      setPolicies(data);
    } catch (err) {
      console.error("Failed to fetch policies:", err);
    }
  }, [setPolicies]);

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

  const handleBlur = useCallback(
    (key: keyof FormState) => {
      const fieldErrors = validate(form);
      if (fieldErrors[key]) {
        setErrors((prev) => ({ ...prev, [key]: fieldErrors[key] }));
      }
    },
    [form],
  );

  const fieldProps = <K extends keyof FormState>(key: K) => ({
    error: !!errors[key],
    helperText: errors[key],
    onBlur: () => handleBlur(key),
  });

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM);
    setErrors({});
  }, []);

  const closeToast = useCallback(() => setToastOpen(false), []);

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

      addPolicy(data);
      fetchPolicies();
      onSuccess();
    } catch {
      setToastMessage("Network error. Please try again.");
      setToastOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    errors,
    isSubmitting,
    toastOpen,
    toastMessage,
    handleChange,
    handleBlur,
    fieldProps,
    handleSubmit,
    resetForm,
    closeToast,
    fetchPolicies,
  };
}
