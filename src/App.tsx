import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme/theme";
import { SessionProvider } from "@/context/SessionContext";
import { NotificationProvider } from "@/context/NotificationContext";
import LandingPage from "@/pages/LandingPage";
import ClientPage from "@/pages/ClientPage";
import ServerPage from "@/pages/ServerPage";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <SessionProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/client" element={<ClientPage />} />
              <Route path="/server" element={<ServerPage />} />
            </Routes>
          </BrowserRouter>
        </SessionProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
