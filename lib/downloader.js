const fs = require("fs");
const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");

function fetchProxy(url, options) {
  const instanceOptions = {
    ...options,
  };

  if (!options.agent && process.env.http_proxy) {
    instanceOptions.agent = new HttpsProxyAgent(process.env.http_proxy);
  }

  return fetch(url, instanceOptions);
}

async function downloadImage(url, localPath) {
  const response = await fetchProxy(url, {
    headers: {
      "user-agent": "medium-2-md",
    },
  });

  return await new Promise((resolve) =>
    response.body
      .pipe(fs.createWriteStream(localPath))
      .on("close", resolve(localPath))
  );
}

module.exports = downloadImage;
