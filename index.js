#!/usr/bin/env node
'use strict';

const program = require('commander');
const workflow = require('./lib/workflow');
const packageJson = require('./package.json');

program
    .version(packageJson.version)
    .command('convertLocal [inputDirectory]')
    .description('Converts Medium exported html files to markdown from a local directory.')
    .option('-d, --drafts', 'Convert drafts too.')
    .option('-f, --frontMatter', 'Add front-matter.')
    .option('-i, --images', 'Download images in local directory.')
    .action(workflow.processAll);

program
    .version(packageJson.version)
    .command('convertUrl [url]')
    .description('Converts Medium post to markdown from its url.')
    .option('-o, --outputDir <>', 'Output directory path.')
    .option('-f, --frontMatter', 'Add front-matter.')
    .option('-i, --images', 'Download images in local directory.')
    .action(workflow.processSingle);

program.parse(process.argv);