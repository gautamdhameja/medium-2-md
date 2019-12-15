const fs = require('fs');
const path = require('path');
const read = require('./reader');
const convert = require('./converter');
const write = require('./writer');
const downloader = require('./downloader');
// const utils = require('./utils');

var processAll = function (inputDir, options) {
    try {
        const inputPath = path.normalize(inputDir);
        const outputPath = path.resolve(inputDir, 'md_' + Date.now());
        const imgDir = path.join(outputPath, 'img');

        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }

        if (options.images === true) {
            if (!fs.existsSync(imgDir)) {
                fs.mkdirSync(imgDir);
            }
        }

        if (fs.existsSync(inputPath)) {
            fs.readdirSync(inputPath).forEach(async file => {
                try {
                    if (path.parse(file).ext === '.html') {
                        if (checkDraft(file, options.drafts)) {
                            const readOutput = read.readAll(path.join(inputDir, file), options.frontMatter);
                            const converterResult = convert(readOutput.html, options.images);
                            if (options.images === true) {
                                const promises = [];

                                converterResult.images.forEach((v) => {
                                    const localImgPath = path.join(imgDir, v.name);
                                    promises.push(downloader(v.src, localImgPath));
                                });

                                await Promise.all(promises);
                            }

                            const data = mergeOutputs(readOutput, converterResult.md, options.frontMatter);
                            const fileName = write(outputPath, path.parse(file).name, data);
                            console.log('Completed: ' + fileName);
                        }
                    }
                } catch (err) {
                    console.log('Error converting file: ' + file + '. Skipping.');
                }
            });

            console.log('Output path: ' + outputPath);
        } else {
            console.log('Invalid input directory.');
        }
    } catch (err) {
        console.log(err.message);
    }
}

// Convert from url has been removed.
// Medium posts seem to have updated (random) css classes and html attributes,
// and the reader is unable to extract the article content from the html body.

// var processSingle = async function (postUrl, options) {
//     try {
//         const outputDir = path.normalize(options.outputDir);
//         if (!fs.existsSync(outputDir)) {
//             throw new Error('Invalid output path.');
//         }

//         if (postUrl && utils.isUrl(postUrl)) {
//             const readOutput = await read.readFromUrl(postUrl);

//             const converterResult = convert(readOutput.html, options.images);
//             if (options.images === true) {
//                 const imgDir = path.join(outputDir, 'img');
//                 if (!fs.existsSync(imgDir)) {
//                     fs.mkdirSync(imgDir);
//                 }

//                 const promises = [];

//                 converterResult.images.forEach((v) => {
//                     const localImgPath = path.join(imgDir, v.name);
//                     promises.push(downloader(v.src, localImgPath));
//                 });

//                 await Promise.all(promises);
//             }
//             const data = mergeOutputs(readOutput, converterResult.md, options.frontMatter);

//             const fileName = utils.getFileNameFromUrl(postUrl);
//             const outputFile = write(outputDir, fileName, data);

//             console.log('Completed: ' + outputFile);
//         }
//     } catch (err) {
//         console.log(err.message);
//     }
// }

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
    processAll
    // processSingle
}
