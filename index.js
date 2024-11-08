#!/usr/bin/env node

import { readFromFiles, writeToFile, timeStamp } from './helpers.js'
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
    // include command name 'add' and a description
    .command('add', 'add a new expense', {
        description: {
            description: 'Enter your description',
            type: 'string',
            demandOption: true
        },
        amount: {
            description: 'Enter your amount',
            type: 'number',
            demandOption: true
        }
    },
        async (argv) => {
            const tasks = await readFromFiles();

            function getNextId() {
                return tasks.length + 1;
            }

            let newTask = {
                id: getNextId(),
                date: timeStamp(),
                description: argv.description,
                amount: argv.amount,
            }

            tasks.push(newTask)
            await writeToFile(tasks)
            console.log(`Expense added successfully (ID: ${tasks.length})`);
        }
    )

    .command('list', 'Lists all the expenses', async () => {
        const tasks = await readFromFiles()
        console.table(tasks);  
    })
    
    .command('summary', 'Gives a summary amount of your expenses', async () => {
        const tasks = await readFromFiles()
        const totalExpenses = tasks.reduce((accumulator, task) => {
            return accumulator += task.amount
        }, 0)
        console.log(`Total Expenses: $${totalExpenses}`);
    })

    })

    .demandCommand(1, 'You need at least one command before moving on')
    .help()
    .argv;
