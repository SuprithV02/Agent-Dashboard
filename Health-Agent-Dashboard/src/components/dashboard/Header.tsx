import { Box, Typography, Stack, Button, Divider } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import NewPolicyModal from "./NewPolicyModal";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          bgcolor: "background.default",
          px: 4, // ← horizontal padding added
          pt: 2,
          pb: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" fontWeight={600}>
              Welcome, Suprith
            </Typography>
            <Typography color="text.secondary">
              Here's what's happening with your portfolio today.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpen(true)}
          >
            New Policy
          </Button>
        </Stack>

        <Divider sx={{ mt: 3 }} />
      </Box>

      <NewPolicyModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
