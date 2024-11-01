#!/usr/bin/env node

console.log("Hello wold!")
const fsModule = require('fs');
const yargs = require('yargs')

const addList = {
    command: 'add description <describe> amount <amnt>',
    describe: 'adds an expense to the list',

    builder: () => {
        return yargs('describe', {
            describe: 'Add a description to your expenses',
            type: 'string',
            demandOption: true
        })
    },

    handler: async (argv) => {
        fsModule.readFile('./db.json', 'utf8', async (err, data) => {
            if (err) {
                console.error('Invalid data!:', err)
                return;
            }

            const response = await data.json();
            console.log(response);
            return response
        })
    }
}