const express = require('express');
const inquirer = require('inquirer');
const { Pool } = require('pg');
require('dotenv').config();

// console.log(process.env);

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

const pool = new Pool ( 
    {
        user: process.env.PSQL_NAME,
        password: process.env.PSQL_PASSWORD,
        host: 'localhost',
        database: 'employee_db'
    },
    console.log('Connected to the database')
)

pool.connect()
.catch(err => console.error("Couldn't connect to database"));

/* pool.query('SELECT * FROM department', function (err, {rows}) {
    console.log(rows);
})
    */

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


async function mainApp() {
    const choices = [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Quit',
        'View All Employees'
    ];
    
const answer = await inquirer.prompt([
    {
        type: 'list',
        name: 'choice',
        message: 'Please select an option',
        choices: choices
    }
    ]);

switch (answer.choice) {
    case 'View All Employees':
        // Could add a function here that runs the code needed
        console.log('test');
        break;
    default:
        console.log('Invalid choice')
}

console.log(answer.choice);
mainApp();
}


mainApp();

