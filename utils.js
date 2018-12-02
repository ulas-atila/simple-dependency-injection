const fs   = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function promisify(func) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            args.push((error, data) => {
                if (error) {
                    return reject(error);
                }
                return resolve(data);
            });
            func.apply(null, args);
        });
    }
}

function getRelativePath(absolutePath, prefix) {
    return path.join(prefix, absolutePath);
}

function getFile(file, prefix) {
    const format = file.split('.').pop();
    const data = fs.readFileSync(getRelativePath(file, prefix), 'utf8');
    if (format == 'yml' || format == 'yaml') {
        return yaml.safeLoad(data);
    }

    return JSON.parse(data);
}

module.exports = {
    promisify,
    getRelativePath,
    getFile
}
