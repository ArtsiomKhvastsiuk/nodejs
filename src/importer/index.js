const util = require('util');
const EventEmitter = require('events');
const fs = require('fs');

class Importer {
    constructor() {

    }

    import(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (error, files) => {
                if (error) reject(error);
                const filesInJson = JSON.stringify(files);
                resolve(files);
            });
        });
    }

    importSync(path) {
        try {
            return fs.readdirSync(path);
        } catch(e) {
            throw(e);
        }
    }
}

module.exports = Importer;