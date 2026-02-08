# Debug Mode Rules

Debugging and testing guidelines as defined in [`docs/CODING_GUIDELINES.md`](docs/CODING_GUIDELINES.md).

## Testing Strategy

- v0 focus: **Smoke tests only**.
- Run all tests using `pnpm test`.
- **Rust:** Use `#[cfg(test)]` modules for basic route tests.
- **Frontend:** Use `@testing-library/react` for basic component render tests.

## Error Handling Principles

- **No Panics:** Ensure no `unwrap()` or `expect()` in production code.
- **Helpful Errors:** Verify that logs and error messages are actionable and descriptive.
- **Rust Errors:** Use `thiserror` and convert to proper HTTP responses via `axum::response::IntoResponse`.

## CI / Validation

- Run `pnpm lint` to check for `clippy` (Rust) and `eslint` (TS) warnings.
- Run `pnpm type-check` for frontend.
- Run `cargo fmt -- --check` for Rust formatting.
