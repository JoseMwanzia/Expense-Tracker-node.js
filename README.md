# Expense Tracker CLI

`expense-tracker` is a Node.js command-line tool for tracking personal expenses. This CLI allows you to add, list, delete, and summarize expenses, including support for monthly summaries.

## Features

- **Add Expense**: Record a new expense with a description and amount.
- **List Expenses**: View all recorded expenses.
- **Delete Expense**: Remove an expense by its unique ID.
- **Summarize Expenses**: Display the total amount spent, and view monthly summaries for a specific year.

## Prerequisites

- **Node.js** (version 14 or later)

## Installation

1. Clone the repository or download the files.
2. Navigate to the project directory.
3. Run the following command to install dependencies:

   ```bash
   npm install
   ```

4. Link the CLI tool globally:
```bash
 npm link
 ```
Now, you can use the expense-tracker command anywhere in your terminal.

## Usage

The CLI provides several commands for managing expenses. Use the following format to run commands:

```bash
expense-tracker <command> [options]
```

## Commands
1. `add` - Add a New Expense

Record a new expense with a description and amount.

```bash
expense-tracker add --description "Groceries" --amount 50
```
Options:

- `--description` (required): Description of the expense.

- `--amount` (required): Amount spent.

2. `list` - List All Expenses.
Display all recorded expenses in a table format.

```bash
expense-tracker list
```
3. `summary` - Summarize Total Expenses

Calculate the total amount of all recorded expenses.

```bash
expense-tracker summary
```
4. `delete` - Delete an Expense by ID.

Remove an expense by its unique ID.

```bash
expense-tracker delete --id <expense_id>
```
Options:

`--id` (required): ID of the expense to delete.

5. `summary` - Monthly Expense Summary

View the total expenses for a specific month in a specific year.

```bash
expense-tracker summary --month <month_number> [year]
```
Options:

- `--month` (required): Month (1-12) to summarize expenses.

- `[year]` (optional): Year to summarize. If omitted, defaults to the current year.

## Example Commands

```bash 
# Add a new expense
expense-tracker add --description "Lunch" --amount 15

# List all expenses
expense-tracker list

# Summarize total expenses
expense-tracker summary

# Delete an expense by ID
expense-tracker delete --id 3

# Monthly summary for October 2022
expense-tracker summary --month 10 2022
```

## Notes

- Expense data is stored in a JSON file in the local directory.

- Make sure to use this CLI within the directory containing the data file or adjust the file paths accordingly in helpers.js.

## License

This project is licensed under the MIT License.

This `README.md` provides an overview of the `expense-tracker` CLI, usage instructions, and command examples to help users get started. Let me know if you'd like further customization!