import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import { mono } from "@/theme/theme";

interface ServerAppBarProps {
  sessionId: string | null;
  onNewSession: () => void;
  onLogout: () => void;
}

export default function ServerAppBar({ sessionId, onNewSession, onLogout }: ServerAppBarProps) {
  return (
    <AppBar position="sticky" color="default">
      <Toolbar sx={{ gap: 1.5, flexWrap: "wrap", py: 1 }}>
        <DnsRoundedIcon sx={{ color: "secondary.light" }} />
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Server Console
        </Typography>

        {sessionId && (
          <Chip
            label={sessionId}
            size="small"
            sx={{
              fontFamily: mono,
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "#DCE1F0",
              border: "1px solid rgba(255,255,255,0.16)",
            }}
          />
        )}

        <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: "auto" }}>
          <Button
            onClick={onNewSession}
            startIcon={<AddCircleOutlineRoundedIcon />}
            variant="outlined"
            size="small"
            sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}
          >
            New session
          </Button>
          <Button
            onClick={onLogout}
            startIcon={<LogoutRoundedIcon />}
            variant="text"
            size="small"
            sx={{ color: "#fff" }}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
