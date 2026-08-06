import { useCallback, useEffect, useState } from "react";
import { moduleService } from "@/services/moduleService";
import type { Module } from "@/types/module";

interface UseModulesResult {
  modules: Module[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/** Fetches every module for a session whenever `sessionId` changes. Pass null to skip. */
export function useModules(sessionId: string | null): UseModulesResult {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!sessionId) {
      setModules([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await moduleService.getModules(sessionId);
      setModules(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load modules.");
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { modules, loading, error, refresh };
}
