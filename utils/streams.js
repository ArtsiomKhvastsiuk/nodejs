#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const through = require('through2');

function choiceAction(config) {
    const {action, fileName, withCreating} = config;
    switch (action) {
        case 'io':
            inputOutput(fileName);
            break;
        case 'transform':
            csvToJson(fileName, withCreating);
            break;
        default: return undefined;
    }
}

function inputOutput(filePath) {
    if (filePath) {
        const reader = fs.createReadStream(__dirname + filePath);
        reader.pipe(process.stdout);
        reader.on('error', (error) => {
            console.log(error);
        });
    } else {
        process.stdin.setEncoding('utf8');
        // why end function doesn't emit?
        const stream = through(IOTransform /*,end*/);
        process.stdin.pipe(stream).pipe(process.stdout);
        stream.on('end', () => {
            process.exit(0);
        });
    }
}

function IOTransform(chunk, encoding, next) {
    const data = chunk.toString();
    this.push(data.toUpperCase());
    this.push(null);
    next();
}

function csvToJson(csvFile, withCreating) {
    const all = [];
    const stream = through(csvToJSONTransform /*,end*/);
    const reader = fs.createReadStream(csvFile);

    if (withCreating) {
        const filename = path.basename(csvFile).slice(0, -3);
        const writer = fs.createWriteStream(filename + '.json');
        reader.pipe(stream).pipe(writer);
        reader.on('data', (data) => {
            all.push(data);
        });
    } else {
        reader.pipe(stream).pipe(process.stdout);
        reader.on('data', (data) => {
            all.push(data);
        });
    }
}

function csvToJSONTransform(buffer, encoding, next) {
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

    const jsonString = JSON.stringify(json, null, 2);
    this.push(jsonString);
    next();
}

program
    .version('0.0.0')
    .option('-a, --action <string>', 'action name')
    .option('-f, --file <string>', 'path to directory')
    .option ('-d --create', 'the flag to create a file');

program.parse(process.argv);

const WITH_NO_COMMANDS = process.argv.slice(2).length === 0;
const config = {
    action: program.action,
    fileName: program.file,
    withCreating: program.create
};
// if no commands were inputted print a usage message
if (WITH_NO_COMMANDS) {
    program.help();
} else {
    choiceAction(config);
}