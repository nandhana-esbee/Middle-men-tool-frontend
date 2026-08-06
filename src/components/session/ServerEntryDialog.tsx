import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { sessionService } from "@/services/sessionService";
import { moduleService } from "@/services/moduleService";

type Step = "choice" | "existing";

interface ServerEntryDialogProps {
  open: boolean;
  onSessionReady: (sessionId: string) => void;
}

export default function ServerEntryDialog({ open, onSessionReady }: ServerEntryDialogProps) {
  const [step, setStep] = useState<Step>("choice");
  const [sessionIdInput, setSessionIdInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setStep("choice");
    setSessionIdInput("");
    setError(null);
    setLoading(false);
  };

  const handleCreateNew = async () => {
    setLoading(true);
    setError(null);
    try {
      const session = await sessionService.createSession();
      reset();
      onSessionReady(session.session_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create a session.");
      setLoading(false);
    }
  };

  const handleOpenExisting = async () => {
    const id = sessionIdInput.trim();
    if (!id) {
      setError("Enter a session id.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Validate the session exists by attempting to load its modules.
      await moduleService.getModules(id);
      onSessionReady(id);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not find that session.");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth disableEscapeKeyDown>
      <DialogTitle>{step === "choice" ? "Get started" : "Open existing session"}</DialogTitle>
      <DialogContent>
        {step === "choice" && (
          <Stack spacing={1.5} sx={{ pt: 0.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Open a session you already have, or generate a brand new one.
            </Typography>

            <Paper
              variant="outlined"
              sx={{ p: 0 }}
              component={Button}
              onClick={() => {
                setError(null);
                setStep("existing");
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ p: 2, width: "100%" }}>
                <FolderOpenRoundedIcon color="primary" />
                <Stack alignItems="flex-start" sx={{ textTransform: "none" }}>
                  <Typography sx={{ textTransform: "none", fontWeight: 600 }}>
                    Open existing session
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: "none" }}>
                    Load modules from a session id
                  </Typography>
                </Stack>
              </Stack>
            </Paper>

            <Paper
              variant="outlined"
              sx={{ p: 0 }}
              component={Button}
              onClick={handleCreateNew}
              disabled={loading}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ p: 2, width: "100%" }}>
                {loading ? (
                  <CircularProgress size={22} />
                ) : (
                  <AddCircleRoundedIcon color="secondary" />
                )}
                <Stack alignItems="flex-start" sx={{ textTransform: "none" }}>
                  <Typography sx={{ textTransform: "none", fontWeight: 600 }}>
                    Create new session
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: "none" }}>
                    Generates a fresh session id
                  </Typography>
                </Stack>
              </Stack>
            </Paper>

            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        )}

        {step === "existing" && (
          <Stack spacing={2} sx={{ pt: 0.5 }}>
            <TextField
              autoFocus
              label="Session ID"
              value={sessionIdInput}
              onChange={(e) => setSessionIdInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleOpenExisting();
              }}
              fullWidth
              disabled={loading}
            />
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        )}
      </DialogContent>
      {step === "existing" && (
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => {
              setStep("choice");
              setError(null);
            }}
            startIcon={<ArrowBackRoundedIcon />}
            color="inherit"
            disabled={loading}
          >
            Back
          </Button>
          <Button
            onClick={handleOpenExisting}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
          >
            Load session
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
