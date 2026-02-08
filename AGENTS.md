# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Status

The project is currently in the design phase. The code structure is planned but not yet implemented. All work should align with the specifications in [`docs/TECHINICAL_DOCUMENT.md`](docs/TECHINICAL_DOCUMENT.md) and [`docs/CODING_GUIDELINES.md`](docs/CODING_GUIDELINES.md).

## Stack

- **Backend:** Rust (Axum)
- **Frontend:** Next.js (App Router)
- **Package Manager:** `pnpm` workspaces

## Key Workflows

- `pnpm dev`: Runs both backend and frontend development servers.
- `pnpm build`: Builds all workspace packages.
- `pnpm test`: Runs smoke tests for Rust and frontend.
- `pnpm lint`: Runs `clippy` for Rust and `eslint` for frontend.
- `pnpm generate`: Creates the API client from the Rust backend's OpenAPI specification.

## Philosophy

- **DX-first:** Prioritizing developer experience, readability, and clarity over cleverness.
- **Type-safety:** End-to-end type safety via a generated client and strong typing in both Rust and TypeScript.
- **Zero-config:** Seamless deployment to Vercel.
- **Minimalist:** Every added dependency must be justified.
