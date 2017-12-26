const DirWathcer = require('./src/dirwatcher');
const Importer = require('./src/importer');

const PATH = './data';

const watcher = new DirWathcer();
const importer = new Importer();

watcher.watch(PATH);
watcher.on('change', (path) => {
    importer.import(path)
        .then((files) => {
            console.log(files);
        })
        .catch((error) => {
            console.log(error);
        });

    try {
        const files = importer.importSync(path);
        console.log(files);
    } catch (e) {
        console.log(e);
    }
});
