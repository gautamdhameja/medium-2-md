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

// parsing figure and figcaption for markdown
td.addRule('figure', {
    filter: 'figure',
    replacement: function (content) {
        const lines = content.split('\n');
        let element = lines[2];
        if(lines[4]) {
            element = [lines[2].slice(0, 2), lines[4], lines[2].slice(2)].join('');
        }

        return element + '\n' + lines[4];
    }
})

const convert = function (htmlStr) {
    return td.turndown(htmlStr);
}

module.exports = convert;