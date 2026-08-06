/**
 * A generation session returned by the backend.
 *
 * `session_id` is the one field every code path in this app relies on.
 * Everything else is kept optional/untyped because the backend's exact
 * session schema was not available at build time (see
 * API_INTEGRATION_NOTES.md at the project root) — any additional fields
 * the API actually returns (created_at, name, module_count, ...) will
 * still flow through and can be rendered without a type change.
 */
export interface Session {
  session_id: string;
  [key: string]: unknown;
}
