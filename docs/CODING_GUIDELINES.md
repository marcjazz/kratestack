# 🧭 Rust Stack v0 Coding Guidelines

## 1️⃣ General Principles

1. **DX-First:** Code readability and clarity > cleverness.
2. **Consistency:** Follow agreed conventions for folder structure, naming, and formatting.
3. **Minimal Dependencies:** Every added dependency must be justified.
4. **Type-Safety:** Leverage Rust’s strong typing, and TypeScript types in frontend.
5. **Documentation:** Every public function or module must have a doc comment.
6. **Error Handling:** No silent unwraps (`unwrap()`/`expect()`) in production code. Use proper error propagation.

---

## 2️⃣ Repository Structure Rules

- `apps/web` → Next.js app
- `apps/api` → Rust backend
- `packages/client` → TypeScript API client
- `README.md` in root for onboarding
- Config files (`package.json`, `Cargo.toml`, `vercel.json`) must stay at root or workspace as specified

> Folder names always **kebab-case**
> File names in Rust **snake_case**, in TS **camelCase**

---

## 3️⃣ Rust Backend Guidelines

### 3.1 Formatting & Style

- Use `rustfmt` for formatting (v1.99+ default settings).
- Enforce via `cargo fmt -- --check` in CI.
- Follow standard Rust naming: structs `PascalCase`, variables/functions `snake_case`.
- Use `clippy` for lints and enforce `cargo clippy --all-targets --all-features -- -D warnings`.

### 3.2 Modules & Files

- One module per file.
- Route handlers in `routes/` folder.
- Models/structs in `models/` folder.
- Keep main.rs minimal — only setup and route registration.

### 3.3 API & OpenAPI

- Use `utoipa` for schema derivation.
- Each API route must have OpenAPI annotations.
- Return consistent JSON structures (with `Result` wrapped responses).

### 3.4 Error Handling

- Use `thiserror` for custom errors.
- Convert errors to proper HTTP responses (`axum::response::IntoResponse`).
- No panics in production code.

---

## 4️⃣ TypeScript Frontend Guidelines

### 4.1 Formatting

- Use Prettier with standard config: 2 spaces, single quotes, semicolons optional.
- Enforce via `pnpm lint:fix` scripts.

### 4.2 Typing

- All API calls must use the generated `@kratestack/client`.
- Avoid `any`.
- Prefer `unknown` when unsure, then refine types.

### 4.3 Folder & Component Structure

```
apps/web/
├── app/           # Next.js App Router pages
├── components/    # Shared components
├── hooks/         # React hooks
├── styles/        # CSS modules / global CSS
```

- Components: PascalCase, one component per file.
- Hooks: camelCase, prefix with `use`.

---

## 5️⃣ Monorepo & Workspace Guidelines

- Use `pnpm` workspaces.
- Avoid circular dependencies.
- Root scripts for dev/build/generate.
- No workspace package should directly depend on another outside `packages/`.

---

## 6️⃣ Testing Guidelines

- v0 minimal: smoke tests only.
- Rust: use `#[cfg(test)]` modules for basic route tests.
- Next.js: `@testing-library/react` for basic component render tests.
- Run tests before deploy: `pnpm test`.

> In v1+, expand coverage and CI integration.

---

## 7️⃣ Commit & Branch Guidelines

- Commit messages: conventional commits (optional for v0)
- Main branch: `main`
- Feature branches: `feature/<short-description>`
- PRs required for any merge to main
- CI lints, formats, and runs tests

---

## 8️⃣ CI / Automation (Minimal v0)

- Run `cargo fmt -- --check` and `cargo clippy --all-targets --all-features`
- Run `pnpm lint` and `pnpm type-check`
- Run smoke tests for Rust and frontend

> Keep v0 CI simple — focus on preventing broken merges.

---

## 9️⃣ Documentation Rules

- Root `README.md` must include:
  - Setup & dev instructions
  - Folder structure
  - CLI usage
  - Deployment guide

- Every Rust module must have doc comments (`///`)

- Every public frontend component must have a brief description

---

## 🔟 Code Review Principles

- Review for clarity, not cleverness.
- Ensure types are correct and complete.
- Ensure logs and errors are helpful.
- Verify CLI scaffolds consistent structure.

---

# ✅ Quick Checklist for v0 Coding Standards

| Area           | Must-haves                         |
| -------------- | ---------------------------------- |
| Formatting     | `rustfmt`, Prettier                |
| Linting        | `clippy`, `eslint`                 |
| Naming         | Consistent casing per language     |
| API Contracts  | All endpoints documented & typed   |
| Error Handling | No panics, proper HTTP responses   |
| DX             | Dev loop works with `pnpm dev`     |
| Deployment     | Deployable to Vercel without edits |
| Documentation  | README + inline comments           |

---

If you want, I can **also draft a v0 coding template / starter checklist** with pre-configured `rustfmt.toml`, `clippy.toml`, `eslint` rules, Prettier, and recommended dev scripts so contributors just drop in and follow the rules automatically.

Do you want me to produce that next?
