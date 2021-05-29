const TurndownService = require("turndown");
const path = require("path");
const url = require("url");
const utils = require("./utils");

const config = {
  headingStyle: "atx",
  hr: "---",
  bulletListMarker: "*",
  codeBlockStyle: "fenced",
  fence: "```",
  emDelimiter: "_",
  strongDelimiter: "**",
  linkStyle: "inlined",
  linkReferenceStyle: "full",
};

const td = new TurndownService(config);
let images = [];
let downloadImages = false;
let imgPath = "img";

// Parsing figure and figcaption for markdown.
td.addRule("figure", {
  filter: "figure",
  replacement: function (content) {
    // This is a hack based on string parsing;
    // ugly and error prone.
    // Need to find a better way to do this!

    const lines = content.split("\n");
    const imageStr = "![](https://cdn-images";
    const imageIndex = lines.findIndex((el) => {
      return el.includes(imageStr);
    });
    let element = lines[imageIndex];

    if (downloadImages === true && element) {
      const imgSrc = element.substring(4, element.length - 1);

      // This check is important as Medium renders embeds (YouTube, etc.) also as figures.
      if (utils.isUrl(imgSrc)) {
        const imgFileName = getImageName(imgSrc);
        const localImgPath = path.join(imgPath, imgFileName);
        element = "![](" + localImgPath + ")";
        images.push({
          src: imgSrc,
          name: imgFileName,
        });
      }
    }

    if (lines[4]) {
      element = [element.slice(0, 2), lines[4], element.slice(2)].join("");
    }

    return (element || "") + "\n" + (lines[4] || "");
  },
});

const convert = function (htmlStr, downloadImagesFlag, imagesPath) {
  downloadImages = downloadImagesFlag;
  images = [];
  imgPath = imagesPath;
  return { md: td.turndown(htmlStr), images };
};

const getImageName = function (imgSrc) {
  const imgUrl = url.parse(imgSrc);
  let imgFileName = path.basename(imgUrl.pathname);
  const parsed = path.parse(imgFileName);
  const name = parsed.name.replace(/[^a-zA-Z0-9]/g, "__");
  const ext = parsed.ext ? parsed.ext : ".jpg"; // If no extension, add .jpg.
  imgFileName = name + ext;
  return imgFileName;
};

module.exports = convert;
