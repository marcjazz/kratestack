# Architect Mode Rules

Structural rules and workspace constraints as defined in [`docs/CODING_GUIDELINES.md`](docs/CODING_GUIDELINES.md) and [`docs/TECHINICAL_DOCUMENT.md`](docs/TECHINICAL_DOCUMENT.md).

## Workspace Structure

- `apps/web` → Next.js app (App Router).
- `apps/api` → Rust backend (Axum).
- `packages/client` → TypeScript API client (generated).
- Folder names MUST be `kebab-case`.

## Rust Backend Organization ([`apps/api`](apps/api))

- `routes/` → Route handlers.
- `models/` → Models/structs.
- `main.rs` → Minimal setup and route registration only.

## Frontend Organization ([`apps/web`](apps/web))

- `app/` → Next.js App Router pages.
- `components/` → Shared components.
- `hooks/` → React hooks.
- `styles/` → CSS modules / global CSS.

## Monorepo Constraints

- Use `pnpm` workspaces.
- Avoid circular dependencies.
- No workspace package should directly depend on another outside `packages/`.
- Root scripts handle `dev`, `build`, and `generate`.

## Deployment

- Zero-config deployment to Vercel.
- Rust runtime for `apps/api`.
