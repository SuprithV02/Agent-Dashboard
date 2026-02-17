import { Paper, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function SectionCard({ title, action, children }: Props) {
  return (
    <Paper sx={{ p: 3 }}>
      {(title || action) && (
        <Stack direction="row" justifyContent="space-between" mb={3}>
          {title && <Typography fontWeight={600}>{title}</Typography>}
          {action}
        </Stack>
      )}
      {children}
    </Paper>
  );
}
