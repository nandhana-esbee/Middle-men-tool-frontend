# Middle Men Console

A React + TypeScript + Vite frontend for the Middle Men backend, with two consoles:

- **Client** - browse sessions and inspect their modules as read-only, formatted JSON
  (copy / download).
- **Server** - open an existing session or generate a new one, then create, edit, and
  delete its modules through a Material UI form.

## Stack

React 18 / TypeScript / Vite / Material UI v6 / Axios / React Router v6 /
React Hook Form / React Context

## Getting started

Start the FastAPI backend from the repository root:

```bash
cd Middle-men-tool
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

Start the frontend:

```bash
cd client/middle-men-frontend
npm install
npm run dev
```

The app reads its backend URL from `VITE_API_BASE_URL` (see `.env` /
`.env.example`), already pointed at the local FastAPI server:

```text
http://127.0.0.1:8000
```

To use the deployed backend instead, change `VITE_API_BASE_URL` to your FastAPI
Cloud URL.

Other scripts:

```bash
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
npm run lint     # eslint
```

## API integration

The API service layer (`src/services/sessionService.ts`,
`src/services/moduleService.ts`) is wired to the FastAPI routes in
`Middle-men-tool/routes.py`. Read `API_INTEGRATION_NOTES.md` for the connected
endpoints and response mapping.

## Project structure

```text
src/
  components/
    layout/      # ClientAppBar, ServerAppBar
    common/      # LoadingState, EmptyState, ConfirmDialog, JsonViewer, CardGridSkeleton
    session/     # SessionCard, ServerEntryDialog
    module/      # ModuleCard, ModuleFormDialog, FeatureFieldArray
  pages/         # LandingPage, ClientPage, ServerPage
  services/      # axiosClient, sessionService, moduleService
  context/       # SessionContext (current server session), NotificationContext (snackbar)
  hooks/         # useSessions, useModules
  types/         # Module, Feature, Session
  utils/         # clipboard, download
  theme/         # MUI theme + design tokens
```

## Notes on behavior

- **Module create vs. edit** call the same `moduleService.createOrUpdateModule`
  function against the same `POST` endpoint.
- **Opening an existing session** on the Server console validates the id by
  fetching its modules; a 404/error keeps you in the dialog with the error shown
  inline instead of dropping you into a broken session.
- **Session context** lives only in memory (`SessionContext`) and clears on
  Logout.
