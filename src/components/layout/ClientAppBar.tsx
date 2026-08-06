import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";

interface ClientAppBarProps {
  onRefresh: () => void;
  onSignOut: () => void;
  refreshing?: boolean;
}

export default function ClientAppBar({ onRefresh, onSignOut, refreshing }: ClientAppBarProps) {
  return (
    <AppBar position="sticky" color="default">
      <Toolbar sx={{ gap: 1.5 }}>
        <HubRoundedIcon sx={{ color: "primary.light" }} />
        <Typography variant="h6" sx={{ color: "#fff", flexGrow: 1 }}>
          Client Dashboard
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="Refresh sessions">
            <span>
              <IconButton onClick={onRefresh} disabled={refreshing} sx={{ color: "#fff" }}>
                <RefreshRoundedIcon
                  sx={refreshing ? { animation: "spin 0.9s linear infinite" } : undefined}
                />
              </IconButton>
            </span>
          </Tooltip>
          <Button
            onClick={onSignOut}
            startIcon={<LogoutRoundedIcon />}
            sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}
            variant="outlined"
            size="small"
          >
            Sign out
          </Button>
        </Stack>
      </Toolbar>
      <style>{`@keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }`}</style>
    </AppBar>
  );
}
