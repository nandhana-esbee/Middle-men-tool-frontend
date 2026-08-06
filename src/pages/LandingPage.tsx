import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { mono } from "@/theme/theme";

const OPTIONS = [
  {
    key: "client",
    title: "Client",
    description: "Browse sessions and inspect their module contracts as read-only JSON.",
    icon: HubRoundedIcon,
    path: "/client",
    accent: "primary.main" as const,
  },
  {
    key: "server",
    title: "Server",
    description: "Open or generate a session, then create, edit, and delete its modules.",
    icon: DnsRoundedIcon,
    path: "/server",
    accent: "secondary.main" as const,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "ink.900",
        backgroundImage:
          "radial-gradient(circle at 15% 20%, rgba(91,120,224,0.18), transparent 45%), radial-gradient(circle at 85% 80%, rgba(14,142,130,0.16), transparent 45%)",
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={1} alignItems="center" sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="caption"
            sx={{ fontFamily: mono, color: "primary.light", letterSpacing: "0.12em" }}
          >
            MIDDLE MEN TOOL
          </Typography>
          <Typography variant="h3" sx={{ color: "#fff" }}>
            Choose a console
          </Typography>
          <Typography variant="body1" sx={{ color: "ink.300", maxWidth: 460 }}>
            One side reads session data, the other writes it. Pick where you're working.
          </Typography>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} justifyContent="center">
          {OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <Card
                key={opt.key}
                sx={{
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.1)",
                  "&:hover": { borderColor: opt.accent },
                }}
              >
                <CardActionArea onClick={() => navigate(opt.path)} sx={{ height: "100%", p: 1 }}>
                  <CardContent sx={{ py: 4 }}>
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "rgba(255,255,255,0.06)",
                          color: opt.accent,
                        }}
                      >
                        <Icon />
                      </Box>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="h5" sx={{ color: "#fff" }}>
                          {opt.title}
                        </Typography>
                        <ArrowOutwardRoundedIcon sx={{ color: "ink.300", fontSize: 18 }} />
                      </Stack>
                      <Typography variant="body2" sx={{ color: "ink.300" }}>
                        {opt.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
