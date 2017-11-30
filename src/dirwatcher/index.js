const util = require('util');
const EventEmitter = require('events');
const fs = require('fs');

class DirWatcher {
    constructor() {
        this.lastModify = null;
    };

    watch(path, delay = 5000) {
        setInterval(() => {
            fs.stat(path, (error, stats) => {
                if (error) {
                    throw error;
                }
                if (this.lastModify && this.lastModify !== stats.mtimeMs) {
                    console.log('Directory was changed');
                    this.emit('change', path);
                    this.lastModify = stats.mtimeMs;
                }
                else if (!this.lastModify) {
                    this.lastModify = stats.mtimeMs;
                    console.log('lastModify is initialized');
                }
                else console.log('Nothing is changed');
            });
        }, delay);
    }
}

util.inherits(DirWatcher, EventEmitter);
module.exports = DirWatcher;