/*
 const DirWathcer = require('./src/dirwatcher');
 const Importer = require('./src/importer');

 const PATH  = './data';

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
 } catch(e) {
 console.log(e);
 }
 });
 */

const fs = require('fs');
const through = require('through2');


function write(buffer, encoding, next) {
    const separator = ',';
    const json = [];
    let columnNames = null;
    let isColumn = true;
    const lines = buffer.toString().split('\n');

    lines.map((line, index) => {
        if (isColumn) {
            columnNames = line.split(separator);
            isColumn = false;
        } else {
            const columns = line.match((/("[^"]+"|[^,]+)/g));
            const row = {};
            if (columns) {
                columns.map((line, index) => {
                    row[columnNames[index]] = line;
                });
            } else return;
            json.push(row);
        }
    });
    const jsonString = JSON.stringify(json);
    this.push(jsonString);
    next();
}

const stream = through(write, /*end*/);

function csvToJson(csvFile, JSONdest) {
    const all = [];
    const reader = fs.createReadStream(csvFile);
    reader.pipe(stream).pipe(process.stdout);
    reader.on('data', (data) => {
        all.push(data);
    });
}

csvToJson('./data/MOCK_DATA.csv');
