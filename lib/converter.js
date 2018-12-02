const TurndownService = require('turndown');

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

const convert = function (htmlStr) {
    return td.turndown(htmlStr);
}

module.exports = convert;