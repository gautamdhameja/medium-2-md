const fs = require('fs');
const request = require('request');

function downloadImage(url, localPath) {
    return new Promise((resolve, reject) => {
        request.head(url, function (err) {
            if (err) {
                reject(err);
            }

            request(url).pipe(fs.createWriteStream(localPath)).on('close', () => resolve(localPath));
        });
    });
}

module.exports = downloadImage;