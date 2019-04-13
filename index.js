#!/usr/bin/env node
'use strict';

const program = require('commander');
const workflow = require('./lib/workflow');

program
    .version('0.2.0')
    .command('convertLocal [inputDirectory]')
    .description('Converts Medium exported html files to markdown from a local directory.')
    .option('-d, --drafts', 'Convert drafts too.')
    .option('-f, --frontMatter','Add front-matter.')
    .action(workflow.processAll);

program
    .version('0.2.0')
    .command('convertUrl [url]')
    .description('Converts Medium post to markdown from its url.')
    .option('-o, --outputDir <>','Output directory path.')
    .option('-f, --frontMatter','Add front-matter.')
    .action(workflow.processSingle);

program.parse(process.argv);