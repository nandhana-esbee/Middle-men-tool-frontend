import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import type { Module } from "@/types/module";
import FeatureFieldArray from "./FeatureFieldArray";

const EMPTY_MODULE: Module = {
  number: 0,
  page: "",
  name: "",
  description: "",
  input_features: [],
  output_features: [],
  api_route: "",
};

interface ModuleFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  initialValue?: Module | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (module: Module) => void;
}

export default function ModuleFormDialog({
  open,
  mode,
  initialValue,
  saving,
  onClose,
  onSubmit,
}: ModuleFormDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Module>({
    defaultValues: EMPTY_MODULE,
    mode: "onBlur",
  });

  useEffect(() => {
    if (open) {
      reset(mode === "edit" && initialValue ? initialValue : EMPTY_MODULE);
    }
  }, [open, mode, initialValue, reset]);

  const submit = handleSubmit((values) => {
    onSubmit({ ...values, number: Number(values.number) });
  });

  return (
    <Dialog open={open} onClose={saving ? undefined : onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {mode === "create" ? "Add module" : "Edit module"}
        <IconButton onClick={onClose} disabled={saving} size="small">
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <form onSubmit={submit}>
        <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Page"
              fullWidth
              required
              {...register("page", { required: "Page is required" })}
              error={!!errors.page}
              helperText={errors.page?.message}
            />
            <TextField
              label="Number"
              type="number"
              fullWidth
              required
              inputProps={{ step: 1 }}
              {...register("number", {
                required: "Number is required",
                valueAsNumber: true,
                validate: (v) => Number.isInteger(v) || "Must be a whole number",
              })}
              error={!!errors.number}
              helperText={errors.number?.message}
            />
          </Stack>

          <TextField
            label="Name"
            fullWidth
            required
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Description"
            fullWidth
            required
            multiline
            minRows={3}
            {...register("description", { required: "Description is required" })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <TextField
            label="API route"
            fullWidth
            required
            placeholder="/api/v1/example"
            {...register("api_route", {
              required: "API route is required",
              pattern: { value: /^\//, message: "Route should start with /" },
            })}
            error={!!errors.api_route}
            helperText={errors.api_route?.message}
          />

          <Divider />

          <FeatureFieldArray control={control} name="input_features" label="Input features" errors={errors} />
          <FeatureFieldArray control={control} name="output_features" label="Output features" errors={errors} />
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} disabled={saving} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            startIcon={saving ? <CircularProgress size={16} color="inherit" /> : undefined}
          >
            {mode === "create" ? "Create module" : "Save changes"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
