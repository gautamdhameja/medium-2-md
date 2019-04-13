const fs = require('fs');
const path = require('path');
const read = require('./reader');
const convert = require('./converter');
const write = require('./writer');

var processAll = function (inputDir, options) {
    try {
        const inputPath = path.normalize(inputDir);
        const outputPath = path.resolve(inputDir, 'md_' + Date.now());

        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }

        if (fs.existsSync(inputPath)) {
            fs.readdirSync(inputPath).forEach(file => {
                if (path.parse(file).ext === '.html') {
                    if (checkDraft(file, options.drafts)) {
                        const readOutput = read.readAll(path.join(inputDir, file), options.frontMatter);
                        const md = convert(readOutput.html);
                        const data = mergeOutputs(readOutput, md, options.frontMatter);
                        const fileName = write(outputPath, path.parse(file).name, data);
                        console.log('Completed: ' + fileName);
                    }
                }
            });

            console.log('Files written at output path: ' + outputPath);
        } else {
            console.log('Invalid input directory.');
        }
    } catch (err) {
        console.log(err);
    }
}

var processSingle = function (postUrl, options) {
    try {
        const outputDir = path.normalize(options.outputDir);
        if (!fs.existsSync(outputDir)) {
            throw new Error('Invalid output path.');
        }

        if (postUrl) {
            read.readFromUrl(postUrl).then(readOutput => {
                const md = convert(readOutput.html);
                const data = mergeOutputs(readOutput, md, options.frontMatter);
                
                const splitArr = postUrl.split('-'); // medium post id
                const id = splitArr[splitArr.length - 1];
                
                const fileName = write(outputDir, id, data);
                console.log('Completed: ' + fileName);
            });
        }
    } catch (err) {
        console.log(err);
    }
}

var mergeOutputs = function (readOutput, md, frontMatter) {
    let data
    if (frontMatter) {
        data =
            '---\n' + readOutput.frontMatter + '---\n'
            + '\n'
            + md;
    } else {
        // In case the front matter is disabled, don't prepend it
        data = md;
    }

    return data;
}

var checkDraft = function (fileName, enableDrafts) {
    if (!enableDrafts && fileName.indexOf('draft_') > -1) {
        return false;
    }

    return true;
}

module.exports = {
    processAll,
    processSingle
}