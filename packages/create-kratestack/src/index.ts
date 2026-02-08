import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import prompts from 'prompts';
import kleur from 'kleur';
import ora from 'ora';
import { execa } from 'execa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  console.log(kleur.bold().cyan('\n🏗️  Welcome to Kratestack!\n'));

  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'What is your project name?',
      initial: 'my-kratestack-app',
      validate: (value: string) => (value.length > 0 ? true : 'Please enter a name'),
    },
    {
      type: 'select',
      name: 'packageManager',
      message: 'Which package manager do you want to use?',
      choices: [
        { title: 'pnpm', value: 'pnpm' },
        { title: 'npm', value: 'npm' },
        { title: 'yarn', value: 'yarn' },
      ],
      initial: 0,
    },
  ]);

  const { projectName, packageManager } = response;

  if (!projectName) {
    console.log(kleur.red('\n✖ Operation cancelled\n'));
    process.exit(0);
  }

  const targetDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `Directory ${projectName} already exists. Overwrite?`,
      initial: false,
    });

    if (!overwrite) {
      console.log(kleur.red('\n✖ Operation cancelled\n'));
      process.exit(0);
    }
    await fs.remove(targetDir);
  }

  const spinner = ora('Scaffolding project...').start();

  const templateDir = path.resolve(__dirname, '../template');
  
  try {
    await fs.copy(templateDir, targetDir);

    // Rename gitignore to .gitignore
    const gitignorePath = path.join(targetDir, 'gitignore');
    if (fs.existsSync(gitignorePath)) {
      await fs.move(gitignorePath, path.join(targetDir, '.gitignore'));
    }

    // Update package.json name
    const pkgPath = path.join(targetDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = await fs.readJson(pkgPath);
      pkg.name = projectName;
      await fs.writeJson(pkgPath, pkg, { spaces: 2 });
    }

    spinner.succeed(kleur.green(`Project ${projectName} created!`));

    const { install } = await prompts({
      type: 'confirm',
      name: 'install',
      message: `Do you want to run ${packageManager} install?`,
      initial: true,
    });

    if (install) {
      const installSpinner = ora(`Running ${packageManager} install...`).start();
      try {
        await execa(packageManager, ['install'], { cwd: targetDir });
        installSpinner.succeed(kleur.green('Dependencies installed!'));
      } catch (error) {
        installSpinner.fail(kleur.red('Failed to install dependencies.'));
        console.error(error);
      }
    }

    console.log(kleur.bold().cyan('\nNext steps:'));
    console.log(kleur.white(`  cd ${projectName}`));
    console.log(kleur.white(`  ${packageManager} dev\n`));

  } catch (error) {
    spinner.fail(kleur.red('Failed to scaffold project.'));
    console.error(error);
    process.exit(1);
  }
}

init().catch(console.error);
