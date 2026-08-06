import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import type { SvgIconComponent } from "@mui/icons-material";

interface EmptyStateProps {
  icon: SvgIconComponent;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 1,
        py: 8,
        px: 3,
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 3,
        backgroundColor: "background.paper",
      }}
    >
      <Icon sx={{ fontSize: 40, color: "ink.300", mb: 1 }} />
      <Typography variant="h6" sx={{ fontFamily: '"Space Grotesk", sans-serif' }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction} sx={{ mt: 2 }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
