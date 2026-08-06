import axiosClient from "./axiosClient";
import type { Module } from "@/types/module";

interface PageModulesPayload {
  session_id: string;
  pages: Record<string, Module[]>;
}

interface PageModulesResponse {
  "module data"?: PageModulesPayload;
}

const ENDPOINTS = {
  listForSession: "/api/v1/get-page-modules",
  createOrUpdate: "/api/v1/create-module",
  remove: "/api/v1/delete-module",
};

function normalizeModule(module: Module): Module {
  return {
    ...module,
    number: Number(module.number),
    input_features: module.input_features ?? [],
    output_features: module.output_features ?? [],
  };
}

function flattenPages(payload?: PageModulesPayload): Module[] {
  if (!payload?.pages) return [];

  return Object.values(payload.pages)
    .flat()
    .map(normalizeModule)
    .sort((a, b) => a.page.localeCompare(b.page) || a.number - b.number);
}

export const moduleService = {
  /** GET every module belonging to a session. Used by both the Client JSON view and the Server module grid. */
  async getModules(sessionId: string): Promise<Module[]> {
    const { data } = await axiosClient.get<PageModulesResponse>(ENDPOINTS.listForSession, {
      params: { session_id: sessionId },
    });
    return flattenPages(data["module data"]);
  },

  /** POST a module. Used for both Add Module and Edit Module, per the brief. */
  async createOrUpdateModule(sessionId: string, module: Module): Promise<Module> {
    await axiosClient.post(ENDPOINTS.createOrUpdate, module, {
      params: { session_id: sessionId },
    });
    return module;
  },

  /** DELETE a module by its number within a session. */
  async deleteModule(sessionId: string, module: Pick<Module, "page" | "number">): Promise<void> {
    await axiosClient.delete(ENDPOINTS.remove, {
      params: {
        session_id: sessionId,
        page: module.page,
        module_number: module.number,
      },
    });
  },
};
