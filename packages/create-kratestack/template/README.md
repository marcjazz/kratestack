# KrateStack

The DX-first fullstack starter for Rust and Next.js.

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

## 2. Architecture

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

## 3. Getting Started

### 3.1 Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)

### 3.2 Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development servers:
   ```bash
   pnpm dev
   ```

3. Modify Rust routes in `apps/api/src/lib.rs`.

4. Regenerate the API client:
   ```bash
   pnpm generate
   ```

## 4. Deployment

### 4.1 Vercel

KrateStack is designed to be deployed to Vercel with zero configuration.

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Vercel will automatically detect the monorepo and use the `vercel.json` configuration.

## 5. Known Limitations

- Serverless cold starts
- No WebSockets
- No background jobs
- No persistent in-memory state
- Limited Vercel Rust runtime maturity

## 6. License

MIT
