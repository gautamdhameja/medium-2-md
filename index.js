#!/usr/bin/env node
'use strict';

const program = require('commander');
const workflow = require('./lib/workflow');

program
    .version('0.1.0')
    .command('convert [inputDirectory]')
    .option('-d, --drafts', 'Convert drafts too.')
    .option('-f, --frontMatter','Add front-matter.')
    .action(workflow);

program.parse(process.argv);

// (
//     () => {
//         workflow('D:\\Downloads\\medium-export\\posts', 'D:\\Downloads\\medium-export\\md');
//     }
// )()