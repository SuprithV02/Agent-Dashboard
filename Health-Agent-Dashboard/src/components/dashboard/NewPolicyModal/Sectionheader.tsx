import { Divider, Grid, Typography } from "@mui/material";

interface SectionHeaderProps {
  label: string;
}

export default function SectionHeader({ label }: SectionHeaderProps) {
  return (
    <Grid size={{ xs: 12 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight={600}
        textTransform="uppercase"
        letterSpacing={0.8}
      >
        {label}
      </Typography>
      <Divider sx={{ mt: 0.5, mb: 1 }} />
    </Grid>
  );
}
