import { Box, Button, Divider, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import NewPolicyModal from "../NewPolicyModal/NewPolicyModal";
import { Add } from "@mui/icons-material";
import { WelcomeText } from "./WelcomeText";

const HEADER_SX = {
  position: "sticky",
  top: 0,
  zIndex: 1100,
  bgcolor: "background.default",
  px: 4,
  pt: 2,
  pb: 2,
};

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <Box sx={HEADER_SX}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <WelcomeText />
          <Button variant="contained" startIcon={<Add />} onClick={openModal}>
            New Policy
          </Button>
        </Stack>
        <Divider sx={{ mt: 3 }} />
      </Box>

      <NewPolicyModal open={isModalOpen} onClose={closeModal} />
    </>
  );
}
