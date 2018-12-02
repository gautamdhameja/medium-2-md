const TurndownService = require('turndown');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json').toString());
const td = new TurndownService(config.turndown);

const convert = function (htmlStr) {
    return td.turndown(htmlStr);
}

module.exports = convert;