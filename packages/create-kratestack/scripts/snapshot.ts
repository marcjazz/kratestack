import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '../../../');
const TEMPLATE_DIR = path.resolve(__dirname, '../template');

const EXCLUDES = [
  'node_modules',
  'target',
  '.next',
  'dist',
  '.git',
  '.roo',
  'packages/create-kratestack',
  'pnpm-lock.yaml',
  'test-scaffold',
];

const INCLUDES = [
  'apps',
  'packages/client',
  'package.json',
  'pnpm-workspace.yaml',
  'tsconfig.json',
  '.gitignore',
  'README.md',
  'vercel.json',
  'Cargo.toml',
];

async function snapshot() {
  console.log('📸 Creating template snapshot...');

  if (fs.existsSync(TEMPLATE_DIR)) {
    await fs.remove(TEMPLATE_DIR);
  }
  await fs.ensureDir(TEMPLATE_DIR);

  for (const item of INCLUDES) {
    const src = path.join(ROOT, item);
    const dest = path.join(TEMPLATE_DIR, item);

    if (!fs.existsSync(src)) {
      console.warn(`⚠️ Warning: ${item} not found, skipping.`);
      continue;
    }

    console.log(`  Copying ${item}...`);
    await fs.copy(src, dest, {
      filter: (srcPath: string) => {
        const relativePath = path.relative(ROOT, srcPath);
        if (!relativePath) return true; // Root itself
        const pathParts = relativePath.split(path.sep);
        const shouldExclude = EXCLUDES.some((exclude) =>
          pathParts.includes(exclude)
        );
        return !shouldExclude;
      },
    });
  }

  // Rename .gitignore to gitignore to avoid npm issues
  const gitignorePath = path.join(TEMPLATE_DIR, '.gitignore');
  if (fs.existsSync(gitignorePath)) {
    await fs.move(gitignorePath, path.join(TEMPLATE_DIR, 'gitignore'));
  }

  console.log('✅ Snapshot complete!');
}

snapshot().catch(console.error);
