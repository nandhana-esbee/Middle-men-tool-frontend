import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopyRounded";
import CheckIcon from "@mui/icons-material/CheckRounded";
import DownloadIcon from "@mui/icons-material/DownloadRounded";
import { copyToClipboard } from "@/utils/clipboard";
import { downloadJson } from "@/utils/download";
import { useNotification } from "@/context/NotificationContext";
import { mono } from "@/theme/theme";

interface JsonViewerProps {
  data: unknown;
  filename: string;
}

export default function JsonViewer({ data, filename }: JsonViewerProps) {
  const { notify } = useNotification();
  const [copied, setCopied] = useState(false);

  const formatted = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const handleCopy = async () => {
    try {
      await copyToClipboard(formatted);
      setCopied(true);
      notify("Copied to clipboard.", "success");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      notify("Could not copy to clipboard.", "error");
    }
  };

  const handleDownload = () => {
    downloadJson(formatted, filename);
    notify("Download started.", "success");
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <Button
          size="small"
          variant="outlined"
          color={copied ? "success" : "primary"}
          startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
          onClick={handleCopy}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          maxHeight: 480,
          overflow: "auto",
          backgroundColor: "ink.900",
          borderColor: "ink.700",
        }}
      >
        <Box
          component="pre"
          sx={{
            m: 0,
            fontFamily: mono,
            fontSize: "0.8125rem",
            lineHeight: 1.6,
            color: "#DCE1F0",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {formatted}
        </Box>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 1 }}>
        <Button size="small" variant="text" startIcon={<DownloadIcon />} onClick={handleDownload}>
          Download JSON
        </Button>
      </Box>
    </Box>
  );
}
