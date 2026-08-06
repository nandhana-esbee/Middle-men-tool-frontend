import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import ClientAppBar from "@/components/layout/ClientAppBar";
import SessionCard from "@/components/session/SessionCard";
import CardGridSkeleton from "@/components/common/CardGridSkeleton";
import EmptyState from "@/components/common/EmptyState";
import LoadingState from "@/components/common/LoadingState";
import JsonViewer from "@/components/common/JsonViewer";
import { useSessions } from "@/hooks/useSessions";
import { useModules } from "@/hooks/useModules";
import { useNotification } from "@/context/NotificationContext";

export default function ClientPage() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { sessions, loading, error, refresh } = useSessions();
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const {
    modules,
    loading: modulesLoading,
    error: modulesError,
  } = useModules(selectedSessionId);

  useEffect(() => {
    if (error) notify(error, "error");
  }, [error, notify]);

  useEffect(() => {
    if (modulesError) notify(modulesError, "error");
  }, [modulesError, notify]);

  const handleRefresh = async () => {
    await refresh();
    notify("Sessions refreshed.", "success");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <ClientAppBar onRefresh={handleRefresh} onSignOut={() => navigate("/")} refreshing={loading} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Sessions
            </Typography>

            {loading && <CardGridSkeleton count={4} lines={1} />}

            {!loading && error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {!loading && !error && sessions.length === 0 && (
              <EmptyState
                icon={InboxRoundedIcon}
                title="No sessions found"
                description="Sessions created on the Server console will show up here."
              />
            )}

            {!loading && sessions.length > 0 && (
              <Stack spacing={1.5}>
                {sessions.map((session) => (
                  <SessionCard
                    key={session.session_id}
                    session={session}
                    selected={session.session_id === selectedSessionId}
                    onClick={() => setSelectedSessionId(session.session_id)}
                  />
                ))}
              </Stack>
            )}
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Module JSON
            </Typography>

            {!selectedSessionId && (
              <EmptyState
                icon={DataObjectRoundedIcon}
                title="Select a session"
                description="Choose a session on the left to view its module contracts as JSON."
              />
            )}

            {selectedSessionId && modulesLoading && (
              <Paper variant="outlined" sx={{ p: 2 }}>
                <LoadingState label="Loading modules…" minHeight={200} />
              </Paper>
            )}

            {selectedSessionId && !modulesLoading && modulesError && (
              <Alert severity="error">{modulesError}</Alert>
            )}

            {selectedSessionId && !modulesLoading && !modulesError && (
              <JsonViewer data={modules} filename={`${selectedSessionId}-modules.json`} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
