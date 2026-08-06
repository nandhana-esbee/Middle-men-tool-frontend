import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface SessionContextValue {
  /** The currently open session id on the Server page, or null before one is opened/created. */
  currentSessionId: string | null;
  setCurrentSessionId: (sessionId: string | null) => void;
  /** Clears the session — called on Logout. */
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const value = useMemo<SessionContextValue>(
    () => ({
      currentSessionId,
      setCurrentSessionId,
      clearSession: () => setCurrentSessionId(null),
    }),
    [currentSessionId],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSessionContext(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return ctx;
}
