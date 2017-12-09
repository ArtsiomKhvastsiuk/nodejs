#!/usr/bin/env node

const program = require('commander');
const through = require('through2');
const fs = require('fs');
const path = require('path');

function choiceAction(config) {
    const {action, fileName} = config;
    switch (action) {
        case 'io':
            inputOutput(fileName);
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
        const stream = through(write, /*end*/);
        process.stdin.pipe(stream).pipe(process.stdout);
        stream.on('end', () => {
            process.exit(0);
        });
    }
}

program
    .version('0.0.0')
    .option('-a, --action <string>', 'action name (--action=nameOfAction)')
    .option('-f, --file <string>', 'path to directory (--file=pathToFIle)');

program.parse(process.argv);

const WITH_NO_COMMANDS = process.argv.slice(2).length === 0;
const config = {
    action: program.action,
    fileName: program.file,
};
// if no commands were inputted print a usage message
if (WITH_NO_COMMANDS) {
    program.help();
} else {
    choiceAction(config);
}

function write(chunk, encoding, next) {
    const data = chunk.toString();
    this.push(data.toUpperCase());
    this.push(null);
    next();
}