import { Box, Container, Link, Typography } from "@mui/material";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {currentYear} Enterprise Analytics. All rights reserved.
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Link
                href="/privacy"
                color="text.secondary"
                underline="hover"
                variant="body2"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                color="text.secondary"
                underline="hover"
                variant="body2"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                color="text.secondary"
                underline="hover"
                variant="body2"
              >
                Contact
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
