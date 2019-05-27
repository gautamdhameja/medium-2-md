const fs = require('fs');
const fetch = require('node-fetch');

async function downloadImage(url, localPath) {
    try {
        await fetch(url, { method: 'HEAD' });
    } catch (err) {
        throw err;
    }

    const response = await fetch(url);

    return await new Promise(resolve => response.body
        .pipe(fs.createWriteStream(localPath))
        .on('close', resolve(localPath)));
}

module.exports = downloadImage;