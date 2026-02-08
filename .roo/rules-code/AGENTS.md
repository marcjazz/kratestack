# Code Mode Rules

Follow these coding conventions as defined in [`docs/CODING_GUIDELINES.md`](docs/CODING_GUIDELINES.md).

## General

- **Naming:** Folder names `kebab-case`. Rust files `snake_case`. TypeScript files `camelCase`.
- **Documentation:** Every public function or module MUST have a doc comment (`///` in Rust).
- **Error Handling:** No silent unwraps (`unwrap()`/`expect()`). Use proper propagation.

## Rust Backend ([`apps/api`](apps/api))

- **Naming:** Structs `PascalCase`, variables/functions `snake_case`.
- **Formatting:** Use `rustfmt`.
- **Linting:** Use `clippy` (`-D warnings`).
- **Modules:** One module per file.
- **OpenAPI:** Use `utoipa` for schema derivation (`#[utoipa::path]`, `#[derive(ToSchema)]`).
- **Error Handling:** Use `thiserror` for custom errors. Convert to `axum::response::IntoResponse`.

## TypeScript Frontend ([`apps/web`](apps/web))

- **Formatting:** Prettier (2 spaces, single quotes).
- **Typing:** Use generated `@kratestack/client`. Avoid `any`.
- **Naming:** Components `PascalCase`, hooks `camelCase` (prefix `use`).
- **Structure:** One component per file.

## API Contracts

- All endpoints must be documented (OpenAPI) and typed end-to-end.
