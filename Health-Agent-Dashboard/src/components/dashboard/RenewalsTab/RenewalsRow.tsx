import { alpha } from "@mui/material/styles";
import type { Renewal } from "../../../types";
import { Chip, TableCell, TableRow, Typography } from "@mui/material";

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Pending: { bg: alpha("#D97706", 0.12), color: "#D97706" },
  "Grace Period": { bg: alpha("#B45309", 0.12), color: "#B45309" },
  Renewed: { bg: alpha("#059669", 0.12), color: "#059669" },
};

const CHIP_SX = {
  fontWeight: 600,
  height: 22,
  borderRadius: 1.5,
  fontSize: "0.75rem",
};

export default function RenewalRow({
  id,
  customer,
  type,
  premium,
  due,
  status,
}: Renewal) {
  const statusStyle = STATUS_STYLES[status];

  return (
    <TableRow sx={{ "&:hover": { backgroundColor: "#FAFBFC" } }}>
      <TableCell>
        <Typography fontWeight={500}>{customer}</Typography>
        <Typography variant="caption" color="text.secondary">
          ID: {id}
        </Typography>
      </TableCell>

      <TableCell>{type}</TableCell>
      <TableCell>{premium}</TableCell>
      <TableCell>{due}</TableCell>

      <TableCell>
        <Chip
          size="small"
          label={status}
          sx={{
            ...CHIP_SX,
            backgroundColor: statusStyle?.bg,
            color: statusStyle?.color,
          }}
        />
      </TableCell>
    </TableRow>
  );
}
