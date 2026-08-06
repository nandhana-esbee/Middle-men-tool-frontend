import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import type { Session } from "@/types/session";
import { mono } from "@/theme/theme";

interface SessionCardProps {
  session: Session;
  selected?: boolean;
  onClick: () => void;
}

/** Renders whatever extra primitive fields the backend returned, beyond session_id. */
function extraFields(session: Session): [string, string][] {
  return Object.entries(session)
    .filter(([key, value]) => key !== "session_id" && (typeof value === "string" || typeof value === "number"))
    .slice(0, 3)
    .map(([key, value]) => [key, String(value)]);
}

export default function SessionCard({ session, selected, onClick }: SessionCardProps) {
  const fields = extraFields(session);

  return (
    <Card
      sx={{
        borderColor: selected ? "primary.main" : "divider",
        borderWidth: selected ? 2 : 1,
        transition: "border-color 120ms ease, transform 120ms ease",
      }}
    >
      <CardActionArea onClick={onClick} sx={{ p: 0.5 }}>
        <CardContent>
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 2,
                backgroundColor: "#EBEFFC",
                color: "primary.main",
                flexShrink: 0,
              }}
            >
              <FolderOpenRoundedIcon fontSize="small" />
            </Box>
            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", textTransform: "none", letterSpacing: 0, fontWeight: 500 }}
              >
                Session
              </Typography>
              <Typography
                sx={{
                  fontFamily: mono,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={session.session_id}
              >
                {session.session_id}
              </Typography>
              {fields.length > 0 && (
                <Stack spacing={0.25} sx={{ mt: 1 }}>
                  {fields.map(([key, value]) => (
                    <Typography key={key} variant="caption" color="text.secondary" noWrap>
                      {key.replace(/_/g, " ")}: {value}
                    </Typography>
                  ))}
                </Stack>
              )}
            </Box>
            <ChevronRightRoundedIcon sx={{ color: "ink.300", flexShrink: 0, mt: 0.5 }} />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
