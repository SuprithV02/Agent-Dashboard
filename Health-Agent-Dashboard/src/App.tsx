import { ThemeProvider, CssBaseline, Box, Grid } from "@mui/material";
import theme from "./theme/theme";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/dashboard/Header";
import KPISection from "./components/dashboard/KPISection";
import PipelineSection from "./components/dashboard/PipelineSection";
import RenewalsSection from "./components/dashboard/RenewalsSection";
import SalesPerformanceSection from "./components/dashboard/SalesPerformanceSection";
import ProTipSection from "./components/dashboard/ProTipSection";
import ClaimsSection from "./components/dashboard/ClaimsSection";
import PoliciesSection from "./components/dashboard/PoliciesSection";
import AllPoliciesPage from "./components/Page/PoliciesPage";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Routes>
          {/* Main dashboard */}
          <Route
            path="/"
            element={
              <Box
                sx={{
                  height: "100vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Sticky Header */}
                <Header />

                {/* Scrollable Content */}
                <Box
                  sx={{
                    flex: 1,
                    overflowY: "auto",
                    p: 4,
                  }}
                >
                  <KPISection />

                  <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                      <PipelineSection />
                      <Box mt={4}>
                        <RenewalsSection />
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <SalesPerformanceSection />
                      <Box mt={4}>
                        <ProTipSection />
                      </Box>
                    </Grid>
                  </Grid>

                  <Box mt={4}>
                    <ClaimsSection />
                  </Box>

                  <Box mt={4}>
                    <PoliciesSection />
                  </Box>
                </Box>
              </Box>
            }
          />

          {/* All policies page */}
          <Route path="/policies" element={<AllPoliciesPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
