import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { execSync } from 'child_process';
import ejs from 'ejs';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function renderDir(dir, data) {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      await renderDir(fullPath, data);
    } else if (file.endsWith('.ejs')) {
      const content = await fs.readFile(fullPath, 'utf8');
      const rendered = ejs.render(content, data, { filename: fullPath });
      const newPath = fullPath.replace('.ejs', '');
      await fs.writeFile(newPath, rendered);
      await fs.remove(fullPath);
    }
  }
}

export async function scaffold(targetDir, options) {
  const { projectName, features, language, projectType, git } = options;
  const templateDir = path.resolve(__dirname, '../../templates');
  
  const spinner = ora('Scaffolding project...').start();

  try {
    // 1. Create target directory
    if (await fs.pathExists(targetDir)) {
      spinner.stop();
      throw new Error(`Directory ${targetDir} already exists.`);
    }
    await fs.ensureDir(targetDir);

    // 2. Copy Core Templates
    const coreSrc = path.join(templateDir, 'core', language);
    if (await fs.pathExists(coreSrc)) {
      await fs.copy(coreSrc, targetDir);
    }

    // 3. Add Project Type Features (e.g., EJS UI)
    if (projectType === 'ejs') {
      const ejsSrc = path.join(templateDir, 'features', 'ejs', language);
      if (await fs.pathExists(ejsSrc)) {
        await fs.copy(ejsSrc, targetDir, { overwrite: true });
      }
    }

    // 4. Add Selected Features
    for (const feature of features) {
      // Language-specific files (controllers, services, etc.)
      const langSrc = path.join(templateDir, 'features', feature, language);
      if (await fs.pathExists(langSrc)) {
        await fs.copy(langSrc, targetDir, { overwrite: true });
      }

      // Shared files (Dockerfile, README, CI/CD)
      const sharedSrc = path.join(templateDir, 'features', feature, 'shared');
      if (await fs.pathExists(sharedSrc)) {
        await fs.copy(sharedSrc, targetDir, { overwrite: true });
      }
    }

    // 5. Render EJS Templates in the target directory
    const templateData = {
      projectName,
      features,
      language,
      projectType,
      port: 5000
    };
    await renderDir(targetDir, templateData);

    // 6. Generate package.json
    const pkg = {
      name: projectName,
      version: '1.0.0',
      main: language === 'js' ? 'src/server.js' : 'dist/server.js',
      type: 'module',
      scripts: {
        start: language === 'js' ? 'node src/server.js' : 'node dist/server.js',
        dev: language === 'js' ? 'nodemon src/server.js' : 'tsx watch src/server.ts',
        build: language === 'ts' ? 'tsc' : 'echo "No build step required"',
      },
      dependencies: {
        express: '^4.18.2',
        dotenv: '^16.0.3',
        mongoose: '^7.0.3',
        cors: '^2.8.5',
        'cookie-parser': '^1.4.6',
      },
      devDependencies: {
        nodemon: '^2.0.22',
      },
    };

    if (projectType === 'ejs') {
      pkg.dependencies['ejs'] = '^3.1.9';
    }

    if (features.includes('auth')) {
      pkg.dependencies['jsonwebtoken'] = '^9.0.0';
      pkg.dependencies['bcryptjs'] = '^2.4.3';
    }

    if (language === 'ts') {
      pkg.devDependencies['typescript'] = '^5.0.4';
      pkg.devDependencies['tsx'] = '^4.7.1';
      pkg.devDependencies['@types/express'] = '^4.17.17';
      pkg.devDependencies['@types/node'] = '^18.15.11';
      pkg.devDependencies['@types/cors'] = '^2.8.13';
      pkg.devDependencies['@types/cookie-parser'] = '^1.4.3';
    }

    await fs.writeJSON(path.join(targetDir, 'package.json'), pkg, { spaces: 2 });

    // 7. Create .env
    let envContent = `PORT=5000\nMONGO_URI=mongodb://localhost:27017/${projectName}\nCORS_ORIGIN=*\nNODE_ENV=development\n`;
    if (features.includes('auth')) {
      envContent += `ACCESS_TOKEN_SECRET=${Math.random().toString(36).substring(2, 15)}\nACCESS_TOKEN_EXPIRY=1d\nREFRESH_TOKEN_SECRET=${Math.random().toString(36).substring(2, 15)}\nREFRESH_TOKEN_EXPIRY=10d\n`;
    }
    await fs.writeFile(path.join(targetDir, '.env'), envContent);

    // 8. Git initialization
    if (git) {
      execSync('git init', { cwd: targetDir, stdio: 'ignore' });
      await fs.writeFile(path.join(targetDir, '.gitignore'), 'node_modules\n.env\ndist\n');
    }

    spinner.succeed(chalk.green('Project structure created successfully!'));

  } catch (error) {
    spinner.fail(chalk.red('Scaffolding failed!'));
    throw error;
  }
}
