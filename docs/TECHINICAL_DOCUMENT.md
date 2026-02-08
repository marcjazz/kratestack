# Rust Stack v0

### Technical Specification for Initial Production Release

---

## 1. Vision

Build a DX-first fullstack starter that provides:

- Rust backend (serverless-ready)
- Next.js frontend
- End-to-end type safety
- Zero Docker
- Zero paid infrastructure requirement
- One-command scaffold
- Seamless deployment to Vercel

Inspired by the ergonomics of T3 Stack, but focused on Rust as the backend engine.

---

## 2. v0 Scope (Strictly Limited)

v0 must include:

- Backend: Axum
- Frontend: Next.js (App Router)
- OpenAPI generation
- TypeScript client generation
- Monorepo structure
- Unified dev command
- Working Vercel deployment
- Node-based CLI scaffold

v0 must NOT include:

- Actix
- Auth system
- Database abstraction
- ORM
- Edge runtime
- Plugin system
- Multi-framework support
- Docker

Restraint is strategic.

---

# 3. Architecture

## 3.1 Repository Structure

```
kratestack/
│
├── apps/
│   ├── web/              # Next.js frontend
│   └── api/              # Axum backend (serverless target)
│
├── packages/
│   └── client/           # Auto-generated TS API client
│
├── package.json          # Workspace root
├── pnpm-workspace.yaml
└── README.md
```

Monorepo managed via `pnpm` workspaces.

No Turborepo in v0.

---

# 4. Backend Specification (Axum)

## 4.1 Runtime Target

Backend must compile into Vercel serverless functions.

Implementation strategy:

- Use Axum
- Use `lambda_http` or compatible adapter
- Build as a serverless handler
- Export single entrypoint

Structure:

```
apps/api/
├── src/
│   ├── main.rs
│   ├── routes/
│   └── models/
├── Cargo.toml
└── build.rs (if needed)
```

---

## 4.2 Dependencies

Core:

- axum
- tokio
- serde
- serde_json
- tower
- tower-http
- utoipa (OpenAPI generation)
- utoipa-swagger-ui (optional in dev)
- lambda_http or compatible runtime layer

---

## 4.3 OpenAPI Generation

All route handlers must:

- Use `#[utoipa::path]`
- Register schema types via `#[derive(ToSchema)]`

At build time:

- Generate `openapi.json`
- Export to `/packages/client/schema/openapi.json`

This file becomes the single source of truth.

---

# 5. Frontend Specification (Next.js)

## 5.1 Configuration

- App Router
- TypeScript
- No experimental features
- Strict mode enabled

Location:

```
apps/web/
```

---

## 5.2 API Client Usage

Frontend must NOT manually define API types.

Instead:

```
import { api } from "@kratestack/client"
```

Usage example:

```ts
const users = await api.users.list()
```

All types must derive from Rust schema.

---

# 6. Type-Safe Client Generation

## 6.1 Generator

Use:

- openapi-typescript
  OR
- orval

Flow:

1. Rust generates `openapi.json`
2. Script runs:

   ```
   pnpm generate
   ```

3. Client output placed in:

   ```
   packages/client/src/
   ```

---

## 6.2 Workspace Linking

`packages/client/package.json`

```json
{
  "name": "@kratestack/client",
  "version": "0.0.0",
  "main": "src/index.ts",
  "types": "src/index.ts"
}
```

Workspace dependency from web:

```json
"@kratestack/client": "workspace:*"
```

---

# 7. Development Experience

## 7.1 Root Scripts

`package.json` at root:

```json
{
  "scripts": {
    "dev": "concurrently \"pnpm --filter api dev\" \"pnpm --filter web dev\"",
    "build": "pnpm -r build",
    "generate": "pnpm --filter api generate && pnpm --filter client build"
  }
}
```

---

## 7.2 Backend Dev Script

Use:

- cargo watch

Example:

```
cargo watch -x run
```

---

## 7.3 Expected Dev Flow

1. `pnpm install`
2. `pnpm dev`
3. Modify Rust route
4. Regenerate client
5. Frontend types update automatically

This loop must feel tight and predictable.

---

# 8. CLI Specification

## 8.1 Technology Choice

CLI written in TypeScript.

Distributed via:

```
npm create kratestack
```

Or:

```
pnpm create kratestack
```

---

## 8.2 Responsibilities

CLI must:

- Ask project name
- Scaffold template
- Replace placeholders
- Run `pnpm install`
- Print next steps

No advanced prompts in v0.

---

## 8.3 CLI Structure

```
packages/create-kratestack/
├── src/
│   └── index.ts
├── package.json
└── bin entry
```

Use:

- prompts
- fs-extra
- execa

---

# 9. Deployment to Vercel

## 9.1 Backend

Backend must be structured as:

```
apps/api/api/index.rs
```

or compatible with Vercel’s Rust serverless builder.

Ensure:

- Proper `vercel.json`
- Correct build output directory
- Runtime specified

Example minimal `vercel.json`:

```json
{
  "functions": {
    "apps/api/api/*.rs": {
      "runtime": "vercel-rust@latest"
    }
  }
}
```

---

## 9.2 Frontend

Next.js deploys automatically.

Monorepo root configured as project root.

Ensure:

- Vercel build command: `pnpm build`
- Install command: `pnpm install`

---

## 9.3 Production Checklist

Before tagging v0:

- Fresh clone test
- Local dev works
- Client generation works
- Vercel deploy succeeds
- Cold start acceptable
- README setup instructions verified
- No hardcoded paths

---

# 10. Documentation Requirements

README must include:

- Philosophy
- Stack explanation
- Folder overview
- Dev instructions
- Deployment guide
- Limitations

Avoid marketing language.
Be precise.

---

# 11. Non-Functional Requirements

v0 must be:

- Reproducible
- Minimal
- Well-commented
- Free-tier deployable
- No hidden complexity

Performance tuning is not required.

---

# 12. Known Limitations (Must Be Documented)

- Serverless cold starts
- No WebSockets
- No background jobs
- No persistent in-memory state
- Limited Vercel Rust runtime maturity

Transparency builds trust.

---

# 13. Versioning Strategy

Initial release:

```
v0.1.0
```

Use semantic versioning.

Do not jump to 1.0 until:

- Framework options added
- Stable API surface
- Community adoption visible

---

# 14. Post-v0 Roadmap (Not Implemented Yet)

- Actix option
- Auth preset
- Database preset
- Edge runtime support
- CLI extensibility
- Rust CLI rewrite

These remain aspirational until demand validates them.

---

# 15. Definition of Done

v0 is complete when:

- A frontend developer can scaffold
- Modify a Rust route
- See types reflected in frontend
- Deploy to Vercel
- Without reading source code internals

If that journey works smoothly, the foundation is solid.
