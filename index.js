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
