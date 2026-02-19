import { Snackbar, Alert, type AlertColor } from "@mui/material";
import { type FC } from "react";

interface ToastProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose: () => void;
  duration?: number;
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
