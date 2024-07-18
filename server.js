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
        viewAllEmployees();
        break;
    case 'Add Employee':
        // function
        break;
    case 'Update Employee Role':
        //function
        break;
    case 'View All Roles':
        viewAllRoles();
        break;
    case 'Add Role':
        //function
        break;
    case 'View All Departments':
        viewAllDepartments();
        break;
    case 'Add Department':
        //function
        break;
    case 'Quit':
        pool.end();
        console.log('Ending Program...');
        process.exit(0); // exits the application with 0 status code.
        break;
    default:
        console.log('Invalid choice')
}

console.log(answer.choice);
}

function viewAllEmployees() {
    pool.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager
        FROM employee 
        INNER JOIN role ON employee.role_id = role.id 
        INNER JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id`, function (err, result) {
            if (err) {
                console.error('Error executing query:', err);
                return;
            }
        console.table(result.rows);
        mainApp();
    })
}

function viewAllDepartments() {
    pool.query(`SELECT department.id, department.name FROM department`, function (err, result) {
        console.table(result.rows);
        mainApp();
    })
}

function viewAllRoles() {
    pool.query(`SELECT role.id, role.title, department.name AS department, role.salary 
    FROM role
    INNER JOIN department ON role.department_id = department.id`, function (err, result) {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
    console.table(result.rows);
    mainApp();
    })
}

function quit() {

}


mainApp();

