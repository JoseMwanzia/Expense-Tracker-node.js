#!/usr/bin/env node

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
