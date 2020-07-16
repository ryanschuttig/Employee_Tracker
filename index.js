const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "rootroot",
    database: "employee_db",
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer.prompt({
        name: "company",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Exit"
        ]
    })
        .then(answers => {
            switch (answers.options) {
                case "View Departments":
                    viewDepartments();
                    break;
                case "View Roles":
                    viewRoles();
                    break;
                case "View Employees":
                    viewEmployees();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Exit":
                    connection.end();
                    break;
            };
        })
};

function viewDepartments() {
    connection.query("SELECT * FROM department", (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    })
};

function viewRoles() {
    connection.query("SELECT roles.title, roles.salary, department.name", (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    })
};