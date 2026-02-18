"use client";

import { Snackbar, Alert } from "@mui/material";
import { FC } from "react";

interface ToastProps {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "info" | "warning";
  onClose: () => void;
  duration?: number; // optional, default 4000ms
}

const Toast: FC<ToastProps> = ({
  open,
  message,
  severity = "error",
  onClose,
  duration = 4000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
