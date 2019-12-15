const fs = require('fs');
const cheerio = require('cheerio');
const yaml = require('js-yaml');
const url = require('url');
// const fetch = require('node-fetch');

const frontMatterTemplate = {
    title: "",
    description: "",
    date: "",
    categories: [],
    keywords: [],
    slug: ""
};

var readAll = function (filePath, frontMatterConfig) {
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

    // no tags available in the exported HTML files

    const frontMatter = generateFrontMatter(title, subtitle, date, slug);

    return { html, frontMatter };
}

// Convert from url has been removed.
// Medium posts seem to have updated (random) css classes and html attributes,
// and the reader is unable to extract the article content from the html body.

// var readFromUrl = async function (postUrl) {
//     const response = await fetch(postUrl);
//     const body = await response.text();

//     const $ = cheerio.load(body);

//     $('.section-divider').remove();

//     const html = $('.postArticle-content').html() || '';
//     const title = $(".graf--title").text();
//     const subtitle = $("meta[name='description']").attr("content");
//     const date = $("meta[property='article:published_time']").attr("content");
//     const canonical = $("link[rel='canonical']").attr("href");
//     const slug = canonical ? url.parse(canonical).path : '';

//     const tags = [];
//     $(".js-postTags li").each((i, e) => tags.push($(e).text()));

//     const frontMatter = generateFrontMatter(title, subtitle, date, slug, tags);

//     return {
//         html,
//         title,
//         frontMatter
//     };
// }

var generateFrontMatter = function (title, subtitle, date, slug, tags) {
    const frontMatter = Object.assign({}, frontMatterTemplate);
    frontMatter.title = title.toString().replace(/\n/g, '');
    frontMatter.description = subtitle ? subtitle.toString().replace(/\n/g, '') : '';
    frontMatter.date = date ? date.toString() : '';
    frontMatter.slug = slug ? slug.toString() : '';
    frontMatter.keywords = tags ? tags : [];
    const yml = yaml.safeDump(frontMatter);
    return yml;
}

module.exports = {
    readAll
    // readFromUrl
}
