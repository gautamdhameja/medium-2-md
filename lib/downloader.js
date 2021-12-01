const fs = require("fs");
const fetch = require("node-fetch");

async function downloadImage(url, localPath) {
  const response = await fetch(url,  {
    headers: {
      'user-agent': 'medium-2-md'
    }
  });

  return await new Promise((resolve) =>
    response.body
      .pipe(fs.createWriteStream(localPath))
      .on("close", resolve(localPath))
  );
}

module.exports = downloadImage;
