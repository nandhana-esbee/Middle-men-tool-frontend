import axiosClient from "./axiosClient";
import type { Session } from "@/types/session";

interface AllSessionsResponse {
  "session data"?: Session[];
  sessions?: Session[];
}

const ENDPOINTS = {
  list: "/api/v1/get-all-sessions",
  create: "/api/v1/generate-session",
};

export const sessionService = {
  /** GET all sessions, for the Client dashboard. */
  async getAllSessions(): Promise<Session[]> {
    const { data } = await axiosClient.get<AllSessionsResponse>(ENDPOINTS.list);
    return data["session data"] ?? data.sessions ?? [];
  },

  /** GET to generate a brand new session. Used by the Server page's "Create New Session". */
  async createSession(): Promise<Session> {
    const { data } = await axiosClient.get<Session>(ENDPOINTS.create);
    return data;
  },
};
