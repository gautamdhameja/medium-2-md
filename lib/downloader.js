const fs = require('fs');
const fetch = require('node-fetch');

async function downloadImage(url, localPath) {
    await fetch(url, { method: 'HEAD' });

    const response = await fetch(url);

    return await new Promise(resolve => response.body
        .pipe(fs.createWriteStream(localPath))
        .on('close', resolve(localPath)));
}

module.exports = downloadImage;