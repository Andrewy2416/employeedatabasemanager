const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require("console.table");
const util = require('util');

const connection = mysql.createConnection({

    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_trackerDB',
});

connection.connect((err) => {
    if (err) throw err;
    prompt();
});

function prompt() {

    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "selection",
                choices: [
                    "View all employees",
                    "Update employee role",
                    "Add new employee",
                    "Remove employee",
                    "View all departments",
                    "Add new department",
                    "View all roles",
                    "Add new role",
                    "Exit"
                ]
            }
        ])

        .then(answers => {

            //how to get index from choices array?
            switch (answers.selection) {

                case "View all employees": viewAllEmployees();
                    break;

                case "Update employee role": updateEmployeeRole();
                    break;

                case "Add new employee": addNewEmployee();
                    break;

                case "Remove employee": removeEmployee();
                    break;

                case "View all departments": viewAllDepartments();
                    break;

                case "Add new department": addNewDepartment();
                    break;

                case "View all roles": viewAllRoles();
                    break;

                case "Add new role": addNewRole();
                    break;

                case "Exit": exit();
                    break;
            }
        });
};

function viewAllEmployees() {

    let query = `SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role
        ON employee.role_id = role.id
        LEFT JOIN department
        ON department.id = role.department_id
        LEFT JOIN employee manager
        ON manager.id = employee.manager_id`;

    connection.query(query, (err, res) => {
        if (err) throw err;

        employeeInfo = res;
        console.table(employeeInfo);
        prompt();
    });
}

function updateEmployeeRole() {

    let query = `SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
        FROM employee
        LEFT JOIN role
        ON employee.role_id = role.id
        LEFT JOIN department
        ON department.id = role.department_id
        LEFT JOIN employee manager
        ON manager.id = employee.manager_id`;

    connection.query(query, (err, res) => {
        if (err) throw err;

        let employee = res.map(function (obj) {
            return `Name: ${obj.name} ID: ${obj.id}`;
        });

        selectRole(employee);
    });

}

function selectRole(employee) {

    let query = `SELECT role.id, role.title, role.salary FROM role`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        let role = res.map(function (obj) {
            return `Role: ${obj.title} Salary: ${obj.salary} ID: ${obj.id}`;
        });

        changeEmployeeRole(employee, role);
    });
}

function changeEmployeeRole(employee, role) {

    inquirer
        .prompt([
            {
                type: "list",
                message: "Select the employee whose role you wish to update:",
                name: "employeeSelect",
                choices: employee
            },
            {
                type: "list",
                message: "Select the new role to apply:",
                name: "roleSelect",
                choices: role
            }
        ])

        .then(answers => {

            let chosenRole = answers.roleSelect.replace(/^([^:]+\:){3}/, '').trim();
            let chosenEmployee = answers.employeeSelect.replace(/^([^:]+\:){2}/, '').trim();

            console.log(chosenRole);
            console.log(chosenEmployee);

            let query = `UPDATE employee SET role_id = ? WHERE id = ?`;
            connection.query(query, [chosenRole, chosenEmployee], (err, res) => {
                if (err) throw err;
                prompt();
            });
        });

}