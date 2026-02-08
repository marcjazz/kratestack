# Ask Mode Rules

Documentation and information retrieval rules as defined in [`docs/CODING_GUIDELINES.md`](docs/CODING_GUIDELINES.md).

## Sources of Truth

- [`docs/TECHINICAL_DOCUMENT.md`](docs/TECHINICAL_DOCUMENT.md): Architecture and design specifications.
- [`docs/CODING_GUIDELINES.md`](docs/CODING_GUIDELINES.md): Coding standards, formatting, and workflows.

## Documentation Rules

- **Rust:** Every module MUST have doc comments (`///`).
- **Frontend:** Every public component must have a brief description.
- **Root README:** Must include setup, folder structure, CLI usage, and deployment guide.

## Project Structure

- `apps/web`: Next.js frontend.
- `apps/api`: Rust backend.
- `packages/client`: API client generated from OpenAPI.
- Config files (`package.json`, `Cargo.toml`) stay at root or workspace level.
