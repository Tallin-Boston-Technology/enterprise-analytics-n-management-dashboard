import { Box, Toolbar } from "@mui/material";
import { useAppSelector } from "../../app/store";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const DRAWER_WIDTH = 240;

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { sidebarOpen } = useAppSelector((state) => state.ui);

  return (
    <>
      <Box
        sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
      >
        <Header />
        <Box sx={{ display: "flex", flex: 1 }}>
          <Sidebar />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              width: { sm: `calc(100% - ${sidebarOpen ? DRAWER_WIDTH : 0}px)` },
              transition: (theme) =>
                theme.transitions.create(["width", "margin"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
            }}
          >
            <Toolbar />
            <Box
              sx={{
                flexGrow: 1,
                p: 3,
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
              }}
            >
              {children}
            </Box>
            <Footer />
          </Box>
        </Box>
      </Box>
    </>
  );
};
