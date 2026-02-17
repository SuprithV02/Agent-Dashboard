import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Typography,
} from "@mui/material";
import SectionCard from "../common/SectionCard";
import { renewals } from "../../data/dashboardData";

import { alpha } from "@mui/material/styles";

const policyStatusStyles: Record<string, { bg: string; color: string }> = {
  Pending: {
    bg: alpha("#D97706", 0.12), // amber
    color: "#D97706",
  },
  "Grace Period": {
    bg: alpha("#B45309", 0.12), // darker amber tone
    color: "#B45309",
  },
  Renewed: {
    bg: alpha("#059669", 0.12), // green
    color: "#059669",
  },
};

export default function RenewalsSection() {
  return (
    <SectionCard title="Renewals Management">
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#F5F7FA",
            }}
          >
            <TableCell
              sx={{ fontWeight: 700, borderBottom: "2px solid #E2E8F0" }}
            >
              Customer
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, borderBottom: "2px solid #E2E8F0" }}
            >
              Policy Type
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, borderBottom: "2px solid #E2E8F0" }}
            >
              Premium
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, borderBottom: "2px solid #E2E8F0" }}
            >
              Due Date
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, borderBottom: "2px solid #E2E8F0" }}
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {renewals.map((row, i) => (
            <TableRow
              key={i}
              sx={{
                "&:hover": {
                  backgroundColor: "#FAFBFC",
                },
              }}
            >
              <TableCell>
                <Typography fontWeight={500}>{row.customer}</Typography>
                <Typography variant="caption" color="text.secondary">
                  ID: {row.id}
                </Typography>
              </TableCell>

              <TableCell>{row.type}</TableCell>
              <TableCell>{row.premium}</TableCell>
              <TableCell>{row.due}</TableCell>

              <TableCell>
                <Chip
                  size="small"
                  label={row.status}
                  sx={{
                    fontWeight: 600,
                    height: 22,
                    borderRadius: 1.5,
                    fontSize: "0.75rem",
                    backgroundColor: policyStatusStyles[row.status]?.bg,
                    color: policyStatusStyles[row.status]?.color,
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionCard>
  );
}
