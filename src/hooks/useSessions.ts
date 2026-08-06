import { useCallback, useEffect, useState } from "react";
import { sessionService } from "@/services/sessionService";
import type { Session } from "@/types/session";

interface UseSessionsResult {
  sessions: Session[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/** Fetches the full session list on mount and exposes a manual refresh. */
export function useSessions(): UseSessionsResult {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sessionService.getAllSessions();
      setSessions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load sessions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { sessions, loading, error, refresh };
}
