const TurndownService = require('turndown');
const path = require('path');
const url = require('url');

const config = {
    headingStyle: "atx",
    hr: "---",
    bulletListMarker: "*",
    codeBlockStyle: "fenced",
    fence: "```",
    emDelimiter: "_",
    strongDelimiter: "**",
    linkStyle: "inlined",
    linkReferenceStyle: "full"
};

const td = new TurndownService(config);
let images = [];
let downloadImages = false;

// parsing figure and figcaption for markdown
td.addRule('figure', {
    filter: 'figure',
    replacement: function (content) {
        // This is a hack based on string parsing;
        // ugly and error prone.
        // Need to find a better way to do this!

        const lines = content.split('\n');
        let element = lines[2];

        if (downloadImages === true) {
            const imgSrc = element.substring(4, element.length - 1);

            // This check is important as Medium renders embeds (YouTube, etc.) also as figures.
            if (is_url(imgSrc)) {
                const imgFileName = getImageName(imgSrc);
                const localImgPath = path.join('img', imgFileName);
                element = "![](" + localImgPath + ")";
                images.push({
                    src: imgSrc,
                    name: imgFileName
                });
            }
        }

        if (lines[4]) {
            element = [element.slice(0, 2), lines[4], element.slice(2)].join('');
        }

        return element + '\n' + lines[4];
    }
})

const convert = function (htmlStr, downloadImagesFlag) {
    downloadImages = downloadImagesFlag;
    images = [];
    return { md: td.turndown(htmlStr), images };
}

const getImageName = function (imgSrc) {
    const imgUrl = url.parse(imgSrc);
    let imgFileName = path.basename(imgUrl.pathname);
    const parsed = path.parse(imgFileName);
    const name = parsed.name.replace(/[^a-zA-Z0-9]/g, '__');
    const ext = parsed.ext ? parsed.ext : ".jpg"; // if no extension, add .jpg
    imgFileName = name + ext;
    return imgFileName;
}

// Code source - https://www.quora.com/What-is-the-best-way-to-validate-for-a-URL-in-JavaScript/answer/Ashish-Kumar-3844
const is_url = function (str) {
    const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = convert;