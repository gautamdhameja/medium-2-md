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
    .option('-p, --prefixSlug <prefix>', 'Use a different prefix for the slug path, replaces /@username/')
    .option('-s, --slugField <name>', 'Specfiy the name of the slug field.', 'slug')
    .action(workflow.processAll);

// Convert from url has been removed.
// Medium posts seem to have updated (random) css classes and html attributes,
// and the reader is unable to extract the article content from the html body.

// program
//     .version(packageJson.version)
//     .command('convertUrl [url]')
//     .description('Converts Medium post to markdown from its url.')
//     .option('-o, --outputDir <>', 'Output directory path.')
//     .option('-f, --frontMatter', 'Add front-matter.')
//     .option('-i, --images', 'Download images in local directory.')
//     .action(workflow.processSingle);

program.parse(process.argv);