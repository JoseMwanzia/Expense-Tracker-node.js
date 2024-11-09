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

    .command('delete', 'delete an expense with a specific ID', {
        id: {
            type: 'number',
            describe: 'then enter the id of the deleted expense',
            demandOption: true,
        }
    }, async (argv) => {
        const tasks = await readFromFiles()
        tasks.splice(argv.id - 1, 1)
        await writeToFile(tasks)
        console.log(`Expense deleted successfully`);
    })

    .command('summary', 'track summary for a specific month', {
        month: {
            type: 'number',
            describe: 'enter the month you wish to view',
            demandOption: true
        }
    }, async (argv) => {
        const tasks = await readFromFiles();
        
        const filteredYear = argv._[1] // If the year is provided in the formatt '10 2022' as the last argument
        ? tasks.filter((item) => {
            const [day, month, year] = item.date.split("/"); // Split by "/"
            const yearDate = parseInt(year, 10); // parse year to integer
            return yearDate === argv._[1] // returns all matching items from filtered year in an []
          })
        : tasks.filter((item) => {
            const [day, month, year] = item.date.split("/");
            const yearDate = parseInt(year, 10);
            return yearDate === new Date().getFullYear(); // returns an [] of all matching items filtered in current year
        })
        
        const filteredMonths = filteredYear.filter(item => {
            const [day, month, year] = item.date.split('/');
            const mnth = parseInt(month, 10)
            return mnth === argv.month // Returns all the months that match in an array
        })


        const totalMonthlyExpenses = filteredMonths.reduce((accumulator, task) => {
            return accumulator += task.amount
        }, 0) // accumulates all the amounts to a sum

        const myYear = argv._[1] || new Date().getFullYear()

        const yearAndMonth = Intl.DateTimeFormat(
            'en-gb', { year: 'numeric', month: 'long' }
        ).format(new Date(
            myYear, 
            argv.month - 1, 
            new Date().getDate()
        )); // returns the month name and year provided by the user

        console.log(`Total expenses for ${yearAndMonth}: $${totalMonthlyExpenses}`);
    })

    .demandCommand(1, 'You need at least one command before moving on')
    .help()
    .argv;
