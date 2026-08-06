import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import type { Module } from "@/types/module";
import { mono } from "@/theme/theme";

interface ModuleCardProps {
  module: Module;
  onEdit: () => void;
  onDelete: () => void;
}

function FeatureChipRow({
  features,
  variant,
  emptyLabel,
}: {
  features: Module["input_features"];
  variant: "input" | "output";
  emptyLabel: string;
}) {
  const color = variant === "input" ? "primary" : "secondary";
  if (features.length === 0) {
    return (
      <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic" }}>
        {emptyLabel}
      </Typography>
    );
  }
  return (
    <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
      {features.map((f, idx) => (
        <Tooltip key={`${f.feature_name}-${idx}`} title={f.feature_datatype}>
          <Chip
            size="small"
            variant="outlined"
            color={color}
            label={f.feature_name}
            sx={{ fontFamily: mono, fontSize: "0.7rem" }}
          />
        </Tooltip>
      ))}
    </Stack>
  );
}

export default function ModuleCard({ module, onEdit, onDelete }: ModuleCardProps) {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Chip
            size="small"
            label={`#${module.number}`}
            sx={{ fontFamily: mono, fontWeight: 700, backgroundColor: "ink.900", color: "#fff" }}
          />
          <Chip size="small" variant="outlined" label={module.page} />
        </Stack>

        <Typography variant="h6" sx={{ fontSize: "1.05rem", lineHeight: 1.3 }}>
          {module.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.5,
            mb: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {module.description}
        </Typography>

        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            px: 1,
            py: 0.5,
            borderRadius: 1.5,
            backgroundColor: "ink.50",
            border: "1px solid",
            borderColor: "divider",
            mb: 2,
          }}
        >
          <Typography sx={{ fontFamily: mono, fontSize: "0.75rem", color: "text.primary" }}>
            {module.api_route}
          </Typography>
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        <Stack spacing={1.25}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Input
            </Typography>
            <FeatureChipRow features={module.input_features} variant="input" emptyLabel="No inputs" />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", color: "ink.300" }}>
            <ArrowRightAltRoundedIcon fontSize="small" sx={{ transform: "rotate(90deg)" }} />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Output
            </Typography>
            <FeatureChipRow features={module.output_features} variant="output" emptyLabel="No outputs" />
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 1.5 }}>
        <Tooltip title="Edit module">
          <IconButton size="small" onClick={onEdit} aria-label={`Edit ${module.name}`}>
            <EditRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete module">
          <IconButton size="small" onClick={onDelete} color="error" aria-label={`Delete ${module.name}`}>
            <DeleteOutlineRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
