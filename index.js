const minimist = require('minimist');
const prompts = require('prompts');
const path = require('path');
const fs = require('fs');
const {
  canSafelyOverwrite,
  isValidPackageName,
  toValidPackageName,
  emptyDir,
} = require('./utils/helpers');
const { templateChoices } = require('./utils/templateOptions');

const defaultProjectName = 'ou-app';

const init = async () => {
  console.log('init');

  const cwd = process.cwd();

  const argv = minimist(process.argv.slice(2), { boolean: true });

  let targetDir;
  let result = {};
  try {
    // Prompts:
    // - Project name:
    // - Package name:
    // - Should create new directory:
    // - Choose a template:
    result = await prompts([
      {
        name: 'projectName',
        type: 'text',
        message: 'Project name:',
        initial: defaultProjectName,
        onState: (state) =>
          (targetDir = String(state.value).trim() || defaultProjectName),
      },
      {
        name: 'packageName',
        type: () => (isValidPackageName(targetDir) ? null : 'text'),
        message: 'Package name:',
        initial: () => toValidPackageName(targetDir),
        validate: (dir) =>
          isValidPackageName(dir) || 'Invalid package.json name',
      },
      {
        name: 'shouldCreateNewDir',
        type: 'toggle',
        message: 'Should create new directory:',
        initial: false,
        active: 'Yes',
        inactive: 'No',
      },
      {
        name: 'shouldOverwrite',
        type: (shouldCreateNewDir) =>
          !shouldCreateNewDir || canSafelyOverwrite(targetDir)
            ? null
            : 'confirm',
        message: () => {
          const dirForPrompt =
            targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`;

          return `${dirForPrompt} is not empty. Remove existing files and continue?`;
        },
      },
      {
        name: 'template',
        type: 'select',
        choices: templateChoices,
        message: 'Choose a template:',
      },
    ]);
  } catch (cancelled) {
    console.log(cancelled.message);
    process.exit(1);
  }

  const {
    projectName,
    packageName,
    shouldCreateNewDir,
    shouldOverwrite = false,
    template,
  } = result;

  const root = shouldCreateNewDir ? path.join(cwd, projectName) : cwd;

  if (shouldCreateNewDir) {
    if (fs.existsSync(root) && shouldOverwrite) {
      emptyDir(root);
    } else if (!fs.existsSync(root)) {
      fs.mkdirSync(root);
    }
  }

  console.log(`\nScaffolding project in ${root}...`);

  const pkg = { name: packageName, version: '0.0.0' };
  fs.writeFileSync(
    path.resolve(root, 'package.json'),
    JSON.stringify(pkg, null, 2)
  );
};

init().catch((e) => {
  console.error(e);
});
