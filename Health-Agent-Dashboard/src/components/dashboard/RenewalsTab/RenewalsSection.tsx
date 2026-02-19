import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import SectionCard from "../../common/SectionCard";
import { renewals } from "../../../data/dashboardData";
import RenewalRow from "./RenewalsRow";

const TABLE_HEADERS = [
  "Customer",
  "Policy Type",
  "Premium",
  "Due Date",
  "Status",
];

const HEADER_CELL_SX = {
  fontWeight: 700,
  borderBottom: "2px solid #E2E8F0",
};

export default function RenewalsSection() {
  return (
    <SectionCard title="Renewals Management">
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F5F7FA" }}>
            {TABLE_HEADERS.map((header) => (
              <TableCell key={header} sx={HEADER_CELL_SX}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {renewals.map((row) => (
            <RenewalRow key={row.id} {...row} />
          ))}
        </TableBody>
      </Table>
    </SectionCard>
  );
}
