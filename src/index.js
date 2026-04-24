#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';
import Table from 'cli-table3';
import { scaffold } from './utils/scaffold.js';

const program = new Command();

program
  .name('create-mern-api')
  .description('A CLI to scaffold production-ready MERN backend projects')
  .version('1.1.0');

program
  .argument('[project-name]', 'Name of the project')
  .action(async (projectName) => {
    console.log(chalk.cyan.bold('\n🚀 Welcome to the MERN Scaffolder (Golden Standard)!\n'));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your project name?',
        default: projectName || 'my-mern-api',
        when: !projectName,
      },
      {
        type: 'rawlist',
        name: 'language',
        message: chalk.yellow('Select Programming Language:'),
        choices: [
          { name: 'JavaScript (ESM)', value: 'js' },
          { name: 'TypeScript', value: 'ts' },
        ],
      },
      {
        type: 'rawlist',
        name: 'projectType',
        message: chalk.cyan('Select Project Architecture:'),
        choices: [
          { name: 'Fullstack (API + EJS UI) - Best for Rapid Prototyping', value: 'ejs' },
          { name: 'Raw Backend (API Only) - The Golden Standard API', value: 'raw' },
        ],
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Which features would you like to include?',
        choices: [
          { name: 'JWT Authentication', value: 'auth' },
          { name: 'Logging (Morgan/Winston)', value: 'logging' },
          { name: 'API Documentation (Swagger)', value: 'docs' },
          { name: 'Validation (Zod)', value: 'validation' },
          { name: 'DevOps (Docker)', value: 'devops' },
        ],
      },
      {
        type: 'confirm',
        name: 'git',
        message: 'Initialize a git repository?',
        default: true,
      },
    ]);

    const finalProjectName = projectName || answers.name;
    const targetDir = path.join(process.cwd(), finalProjectName);

    try {
      await scaffold(targetDir, {
        projectName: finalProjectName,
        language: answers.language,
        projectType: answers.projectType,
        features: answers.features,
        git: answers.git,
      });

      // Show Summary Table
      const table = new Table({
        head: [chalk.cyan('Property'), chalk.cyan('Value')],
        colWidths: [20, 40]
      });

      table.push(
        ['Project Name', chalk.green(finalProjectName)],
        ['Language', answers.language === 'js' ? chalk.yellow('JavaScript') : chalk.blue('TypeScript')],
        ['Type', answers.projectType === 'ejs' ? chalk.hex('#FFA500')('Fullstack (EJS)') : (answers.language === 'ts' ? chalk.blue : chalk.yellow)('Raw Backend')],
        ['Features', answers.features.length > 0 ? answers.features.join(', ') : 'None'],
        ['Port', '5000'],
        ['Status', chalk.green('✅ Built Successfully')]
      );

      console.log('\n' + table.toString());

      console.log(chalk.yellow(`\nNext steps:`));
      console.log(chalk.white(`  cd ${finalProjectName}`));
      console.log(chalk.white(`  npm install`));
      console.log(chalk.white(`  npm run dev\n`));

    } catch (error) {
      console.error(chalk.red('\n❌ Error scaffolding project:'), error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
