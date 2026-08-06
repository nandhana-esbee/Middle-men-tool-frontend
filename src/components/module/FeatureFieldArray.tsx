import { Controller, useFieldArray, type Control, type FieldErrors } from "react-hook-form";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { FEATURE_DATATYPES, type Module } from "@/types/module";

type FeatureListName = "input_features" | "output_features";

interface FeatureFieldArrayProps {
  control: Control<Module>;
  name: FeatureListName;
  label: string;
  errors: FieldErrors<Module>;
}

export default function FeatureFieldArray({ control, name, label, errors }: FeatureFieldArrayProps) {
  const { fields, append, remove } = useFieldArray({ control, name });
  const listErrors = errors[name];

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="subtitle2">{label}</Typography>
        <Button
          size="small"
          startIcon={<AddRoundedIcon fontSize="small" />}
          onClick={() => append({ feature_name: "", feature_datatype: "" })}
        >
          Add feature
        </Button>
      </Stack>

      {fields.length === 0 && (
        <Typography variant="caption" color="text.secondary">
          No {label.toLowerCase()} yet.
        </Typography>
      )}

      <Stack spacing={1.25}>
        {fields.map((field, index) => {
          const nameError = Array.isArray(listErrors) ? listErrors[index]?.feature_name : undefined;
          const typeError = Array.isArray(listErrors) ? listErrors[index]?.feature_datatype : undefined;
          return (
            <Stack key={field.id} direction="row" spacing={1} alignItems="flex-start">
              <Controller
                name={`${name}.${index}.feature_name` as const}
                control={control}
                rules={{ required: "Required" }}
                render={({ field: rhf }) => (
                  <TextField
                    {...rhf}
                    label="Feature name"
                    fullWidth
                    error={!!nameError}
                    helperText={nameError?.message}
                  />
                )}
              />
              <Controller
                name={`${name}.${index}.feature_datatype` as const}
                control={control}
                rules={{ required: "Required" }}
                render={({ field: rhf }) => (
                  <Autocomplete
                    freeSolo
                    fullWidth
                    options={FEATURE_DATATYPES as unknown as string[]}
                    value={rhf.value || ""}
                    onChange={(_, val) => rhf.onChange(val ?? "")}
                    onInputChange={(_, val) => rhf.onChange(val)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Datatype"
                        error={!!typeError}
                        helperText={typeError?.message}
                      />
                    )}
                  />
                )}
              />
              <IconButton
                aria-label="Remove feature"
                onClick={() => remove(index)}
                sx={{ mt: 0.5 }}
                size="small"
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}
