# Workspace Extension

Work across multiple folders without opening pi from a parent directory.

## Setup

Create `.pi/workspace.json` in your project:

```json
{
  "folders": [
    { "path": "../frontend", "name": "frontend" },
    { "path": "../backend" },
    { "path": "/shared/libs", "name": "shared" }
  ]
}
```

- **`path`** — relative (to your project root) or absolute
- **`name`** — optional alias; defaults to the folder's basename

No need to include your current directory — pi already has full access to it.

## Usage

### File tools (read, write, edit)

Use `@folder/path` syntax to reference files in workspace folders:

```
@frontend/src/App.tsx
@backend/api/routes.ts
@shared/utils/helpers.ts
```

### Bash

Workspace folders are available as environment variables prefixed with `WS_`:

```bash
ls $WS_FRONTEND/src
grep -r "TODO" $WS_BACKEND/api
diff $WS_FRONTEND/types.ts $WS_BACKEND/types.ts
```

The env var name is derived from the folder name: uppercased with non-alphanumeric characters replaced by underscores (e.g. `my-frontend` → `$WS_MY_FRONTEND`).

### Commands

- **`/workspace`** — list configured folders and their resolved paths
- **`/workspace reload`** — re-read `.pi/workspace.json` after making changes

## How it works

- On session start, loads `.pi/workspace.json` and shows active folders in the footer
- Injects workspace context into the system prompt so the LLM knows about available folders
- Intercepts `read`, `write`, and `edit` tool calls to resolve `@folder/path` to absolute paths
- Prepends `export WS_*=...` to bash commands so env vars are available
