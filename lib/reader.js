const fs = require('fs');
const cheerio = require('cheerio');
const yaml = require('js-yaml');
const url = require('url');

const frontMatterTemplate = {
    title: "",
    description: "",
    date: "",
    categories: "",
    keywords: "",
    slug: ""
};

var read = function (filePath, frontMatterConfig) {
    const contents = fs.readFileSync(filePath);

    let $ = cheerio.load(contents);
    let canonical = $('.p-canonical').attr('href');
    $('.graf--title').remove();
    $('.graf--subtitle').remove();
    $('.section-divider').remove();

    let html = $('.e-content').html() || '';
    if (frontMatterConfig !== true) {
        html = $('.h-entry').html() || '';
    }

    const title = $('.p-name').text();
    const subtitle = $('.p-summary[data-field="subtitle"]').text();
    const date = $('.dt-published').attr('datetime');
    const slug = canonical ? url.parse(canonical).path : '';

    const frontMatter = generateFrontMatter(title, subtitle, date, slug);

    return { html, frontMatter };
}

var generateFrontMatter = function (title, subtitle, date, slug) {
    const frontMatter = Object.assign({}, frontMatterTemplate);
    frontMatter.title = title.toString().replace(/\n/g, '');
    frontMatter.description = subtitle.toString().replace(/\n/g, '');
    frontMatter.date = date ? date.toString() : '';
    frontMatter.slug = slug ? slug.toString() : '';
    const yml = yaml.safeDump(frontMatter);
    return yml;
}

module.exports = read;