import { Box, Typography, Container } from "@mui/material";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common";
import { Home as HomeIcon } from "@mui/icons-material";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              textAlign: "center",
              py: 8,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "6rem", md: "8rem" },
                fontWeight: "bold",
                color: "primary.main",
                mb: 2,
              }}
            >
              404
            </Typography>
            <Typography variant="h4" gutterBottom fontWeight="medium">
              Page Not Found
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              The Page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/dashboard")}
            >
              Go to dashboard
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};
