const fs = require('fs');
const path = require('path');

var write = function (outputDir, file, data) {
    const filePath = path.join(outputDir, file + '.md');
    fs.writeFileSync(filePath, data);
    return path.basename(filePath);
}

module.exports = write;