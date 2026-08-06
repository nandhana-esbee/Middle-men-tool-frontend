# API Integration Notes

The frontend is now wired to the FastAPI routes defined in
`Middle-men-tool/routes.py`. Every screen talks to the backend through
`src/services/sessionService.ts` and `src/services/moduleService.ts`, so route or
response-shape changes should stay isolated there.

## Connected endpoints

| Purpose | Method & path | Used by | Defined in |
|---|---|---|---|
| List all sessions | `GET /api/v1/get-all-sessions` | Client dashboard on load | `src/services/sessionService.ts` |
| Create a new session | `GET /api/v1/generate-session` | Server "Create new session" + "New session" button | `src/services/sessionService.ts` |
| List a session's modules | `GET /api/v1/get-page-modules?session_id={session_id}` | Client JSON view, Server module grid, Server "Open existing session" validation | `src/services/moduleService.ts` |
| Create or update a module | `POST /api/v1/create-module?session_id={session_id}` | Server "Add module" and "Edit module" | `src/services/moduleService.ts` |
| Delete a module | `DELETE /api/v1/delete-module?session_id={session_id}&page={page}&module_number={number}` | Server module card delete | `src/services/moduleService.ts` |

## Response mapping

- `GET /get-all-sessions` returns sessions under `"session data"`; the service unwraps that to `Session[]`.
- `GET /get-page-modules` returns modules grouped by page under `"module data".pages`; the service flattens that into the `Module[]` shape used by the UI and normalizes module `number` back to a number.
- `POST /create-module` returns metadata rather than the saved module; the service returns the submitted module after a successful request.
- `DELETE /delete-module` requires `page` as well as `module_number`, so delete calls pass the selected module instead of only its number.
