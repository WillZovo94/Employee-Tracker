-- Creating database and if it exists to drop it.
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- To access employee_db database
\c employee_db;

-- Creates table called department that has a primary i d key, and a name.
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL -- to hold department name
);

-- Creates a table called role with id, title, salary, and department_id as well as a FOREIGN KEY related to the department id.
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL, --to hold role title
    salary DECIMAL NOT NULL, -- to hold role salary
    department_id INTEGER NOT NULL, -- to hold references to department role belongs to
    FOREIGN KEY (department_id) REFERENCES department (id)
);

-- Created a table called employee with id, first_name, last_name, role_id, and manager_id along with two FOREIGN KEYS with role and employee id.
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL, -- to hold employee first name
    last_name VARCHAR(30) NOT NULL, -- to hold employee last name
    role_id INTEGER NOT NULL, -- to hold reference to employee role
    manager_id INTEGER, -- to hold reference to another employee that is the manager of the current employee ('null if the employee has no manager')
    FOREIGN KEY (role_id) REFERENCES role (id),
    FOREIGN KEY (manager_id) REFERENCES employee (id)
);
