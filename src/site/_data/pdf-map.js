const fs = require('fs');
const path = require('path');

module.exports = function() {
    const pdfs = {};
    function scanDir(dir) {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                scanDir(fullPath);
            } else if (file.endsWith('.pdf')) {
                const relativePath = fullPath.replace('src/site/notes/', '/notes/');
                pdfs[file] = relativePath;
            }
        });
    }
    scanDir('src/site/notes');
    return pdfs;
};
