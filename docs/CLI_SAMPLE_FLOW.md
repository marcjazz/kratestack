# 🎯 Design Principles for the CLI

1. Fast. Under 20 seconds to scaffold.
2. Minimal questions.
3. Safe defaults.
4. Clear next steps.
5. No decision fatigue.
6. No Rust knowledge required up front.

The goal is that a Next.js developer can run it without anxiety.

---

# 🧭 Invocation

Primary entry:

```
pnpm create kratestack
```

Alternative:

```
npm create kratestack@latest
```

No global install required.

---

# 🪄 Full CLI Flow (v0)

Below is the exact interactive UX.

---

## Step 1: Welcome Screen

Displayed instantly:

```
🦀 Rust Stack v0

A type-safe Rust backend + Next.js starter.
Deploys to Vercel. No Docker required.
```

No fluff. No jokes. Keep it professional and confident.

---

## Step 2: Project Name Prompt

Prompt:

```
? What is your project name?
  › my-rust-app
```

Rules:

- Kebab-case enforced
- Auto-suggest folder name
- Validate against existing directory

If directory exists:

```
✖ Directory already exists.
```

---

## Step 3: Package Manager Detection

Automatically detect:

- pnpm
- npm
- yarn

If none found:

```
? Which package manager do you want to use?
  ○ pnpm (recommended)
  ○ npm
  ○ yarn
```

Default: pnpm.

---

## Step 4: Install Dependencies?

Prompt:

```
? Install dependencies now?
  ● Yes
  ○ No
```

Default: Yes.

This is important because:

- Some devs want to inspect first
- Others want instant ready-to-run

---

## Step 5: Scaffolding Output

While generating:

```
Scaffolding project...
  ✓ Creating workspace
  ✓ Setting up Next.js
  ✓ Setting up Axum backend
  ✓ Configuring OpenAPI
  ✓ Linking client package
  ✓ Writing vercel.json
```

Use clean checkmarks.
No excessive spinner noise.

---

## Step 6: Dependency Installation (if Yes selected)

Display:

```
Installing dependencies...
```

Then stream install output normally.

Do not silence it.
People trust visible installs.

---

## Step 7: Success Screen

This is critical.

Clear and structured:

```
✔ Project ready!

Next steps:

  cd my-rust-app
  pnpm dev

This will start:
  • Next.js frontend at http://localhost:3000
  • Axum API at http://localhost:3001

Type-safe API client is auto-generated from Rust OpenAPI schema.

To deploy:
  1. Push to GitHub
  2. Import project into Vercel
  3. Deploy

Docs: https://yourdocs.dev
```

No walls of text.

---

# 🧩 Generated Project State After CLI

Immediately runnable:

```
my-rust-app/
```

Contains:

- Working `/api/hello`
- Next page that calls `/api/hello`
- OpenAPI generation script
- Pre-configured dev scripts
- Vercel config

User should be able to:

1. Run `pnpm dev`
2. Edit Rust route
3. Refresh browser
4. See updated response

Without manual configuration.

---

# 🧠 Hidden UX Considerations

These are subtle but important.

## 1️⃣ Rust Check

Before scaffolding:

Check if Rust is installed.

If not:

```
Rust is required for the backend.

Install Rust from:
https://rustup.rs

Then re-run this command.
```

Fail fast.
Do not scaffold broken projects.

---

## 2️⃣ Node Version Check

Require:
Node 18+

If below:

```
Node 18+ required.
```

Stop early.

---

## 3️⃣ Clear Error Boundaries

If install fails:

- Print message
- Exit gracefully
- Do not dump stack trace unless debug flag used

---

# 🧬 Non-Interactive Mode (Future Ready)

Even in v0, support:

```
pnpm create kratestack my-app --no-install
```

This helps CI and power users.

But do not document heavily yet.

---

# 🚀 DX Gold Standard Scenario

User experience must feel like:

1. Scaffold
2. Run dev
3. Edit Rust struct
4. See frontend type update
5. Deploy to Vercel successfully

If this loop works smoothly, you win.

---

# 🧭 What We Are Intentionally NOT Doing in v0

No framework selection.
No database choice.
No auth preset.
No runtime selection.
No Tailwind prompt.
No environment variable wizard.

Those explode complexity.

---

# 📦 CLI Implementation Stack

Tech stack for CLI:

- TypeScript
- prompts
- fs-extra
- execa
- kleur or picocolors
- ora (minimal spinner usage)

Keep dependencies light.

---

# 🧱 File Templating Strategy

Use:

- Copy static template directory
- Replace project name placeholders
- Avoid dynamic code generation in v0

Simple file copying is robust.

---

# 🎯 Success Metrics for CLI

v0 CLI is successful if:

- Setup time < 2 minutes
- Zero manual edits required
- Works on macOS, Windows, Linux
- First deployment succeeds without docs digging

---

# 🏛 Strategic Positioning

The CLI should feel:

- Confident
- Boring in a good way
- Professional
- Stable
- Not experimental

Rust devs value stability.
Frontend devs value smoothness.

Balance both.
