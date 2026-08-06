import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import ServerAppBar from "@/components/layout/ServerAppBar";
import ServerEntryDialog from "@/components/session/ServerEntryDialog";
import ModuleCard from "@/components/module/ModuleCard";
import ModuleFormDialog from "@/components/module/ModuleFormDialog";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import CardGridSkeleton from "@/components/common/CardGridSkeleton";
import { useSessionContext } from "@/context/SessionContext";
import { useNotification } from "@/context/NotificationContext";
import { useModules } from "@/hooks/useModules";
import { moduleService } from "@/services/moduleService";
import type { Module } from "@/types/module";

type FormState = { open: boolean; mode: "create" | "edit"; initialValue: Module | null };

function groupModulesByPage(modules: Module[]): Array<[string, Module[]]> {
  const groups = modules.reduce<Record<string, Module[]>>((acc, module) => {
    const page = module.page.trim() || "Untitled page";
    acc[page] = acc[page] ? [...acc[page], module] : [module];
    return acc;
  }, {});

  return Object.entries(groups).map(([page, pageModules]) => [
    page,
    [...pageModules].sort((a, b) => a.number - b.number),
  ]);
}

export default function ServerPage() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { currentSessionId, setCurrentSessionId, clearSession } = useSessionContext();
  const { modules, loading, error, refresh } = useModules(currentSessionId);
  const moduleGroups = useMemo(() => groupModulesByPage(modules), [modules]);

  const [formState, setFormState] = useState<FormState>({ open: false, mode: "create", initialValue: null });
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Module | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (error) notify(error, "error");
  }, [error, notify]);

  const handleSessionReady = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    notify(`Session ${sessionId} is open.`, "success");
  };

  const handleNewSession = () => {
    setCurrentSessionId(null);
  };

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

  const openCreateDialog = () => setFormState({ open: true, mode: "create", initialValue: null });
  const openEditDialog = (module: Module) => setFormState({ open: true, mode: "edit", initialValue: module });
  const closeFormDialog = () => setFormState((s) => ({ ...s, open: false }));

  const handleSaveModule = async (module: Module) => {
    if (!currentSessionId) return;
    setSaving(true);
    try {
      await moduleService.createOrUpdateModule(currentSessionId, module);
      notify(formState.mode === "create" ? "Module created." : "Module updated.", "success");
      closeFormDialog();
      await refresh();
    } catch (err) {
      notify(err instanceof Error ? err.message : "Could not save the module.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!currentSessionId || !deleteTarget) return;
    setDeleting(true);
    try {
      await moduleService.deleteModule(currentSessionId, deleteTarget);
      notify("Module deleted.", "success");
      setDeleteTarget(null);
      await refresh();
    } catch (err) {
      notify(err instanceof Error ? err.message : "Could not delete the module.", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <ServerEntryDialog open={!currentSessionId} onSessionReady={handleSessionReady} />

      {currentSessionId && (
        <>
          <ServerAppBar
            sessionId={currentSessionId}
            onNewSession={handleNewSession}
            onLogout={handleLogout}
          />

          <Container maxWidth="lg" sx={{ py: 4, pb: 12 }}>
            {loading && <CardGridSkeleton count={6} />}

            {!loading && error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {!loading && !error && modules.length === 0 && (
              <EmptyState
                icon={WidgetsRoundedIcon}
                title="No modules yet"
                description="Add your first module to define a page, its API route, and its inputs and outputs."
                actionLabel="Add module"
                onAction={openCreateDialog}
              />
            )}

            {!loading && modules.length > 0 && (
              <Stack spacing={4}>
                {moduleGroups.map(([page, pageModules]) => (
                  <Box component="section" key={page}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ mb: 1.5 }}
                    >
                      <Typography variant="subtitle2">{page}</Typography>
                      <Chip size="small" label={`${pageModules.length} module${pageModules.length === 1 ? "" : "s"}`} />
                    </Stack>

                    <Grid container spacing={2.5}>
                      {pageModules.map((module) => (
                        <Grid item xs={12} sm={6} md={4} key={`${module.page}-${module.number}`}>
                          <ModuleCard
                            module={module}
                            onEdit={() => openEditDialog(module)}
                            onDelete={() => setDeleteTarget(module)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </Stack>
            )}
          </Container>

          <Fab
            color="primary"
            aria-label="Add module"
            onClick={openCreateDialog}
            sx={{ position: "fixed", bottom: 32, right: 32 }}
          >
            <AddRoundedIcon />
          </Fab>

          <ModuleFormDialog
            open={formState.open}
            mode={formState.mode}
            initialValue={formState.initialValue}
            saving={saving}
            onClose={closeFormDialog}
            onSubmit={handleSaveModule}
          />

          <ConfirmDialog
            open={!!deleteTarget}
            title="Delete module?"
            description={
              deleteTarget
                ? `"${deleteTarget.name}" (#${deleteTarget.number}) will be permanently removed from this session.`
                : ""
            }
            confirmLabel="Delete"
            destructive
            loading={deleting}
            onConfirm={handleConfirmDelete}
            onClose={() => setDeleteTarget(null)}
          />
        </>
      )}
    </Box>
  );
}
