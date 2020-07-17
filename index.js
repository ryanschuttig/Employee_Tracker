const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

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
            switch (answers.company) {
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
                case "Exit":
                    exit();
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
    connection.query("SELECT * FROM roles", (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    })
};

function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    })
};

function addDepartment() {
    inquirer.prompt({
        name: "newDepartment",
        type: "input",
        message: "What department would you like to add?",
    })
        .then(answers => {
            connection.query("INSERT INTO department SET ?",
                {
                    name: answers.newDepartment,
                },
                (err, results) => {
                    if (err) throw err;
                    console.table(results);
                    start();
                })
        })
};

function addRole() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What role would you like to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?"
        },
        {
            name: "departmentId",
            type: "input",
            message: "What is the Department ID?",
        },
    ])
        .then(answers => {

            connection.query("INSERT INTO roles SET ?",
                {
                    title: answers.title,
                    salary: answers.salary,
                    department_id: answers.departmentId
                },

                (err, results) => {
                    if (err) throw err;
                    console.table(results);
                    start();
                })
        })
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "first",
            type: "input",
            message: "First name?"
        },
        {
            name: "last",
            type: "input",
            message: "Last name?"
        },
        {
            name: "roleID",
            type: "input",
            message: "What is this employee's role ID?"
        },
        {
            name: "managerID",
            type: "input",
            message: "What is this employee's manager's ID number?"
        },
    ])
        .then(answers => {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answers.first,
                    last_name: answers.last,
                    role_id: answers.roleID,
                    manager_id: answers.managerID
                },

                (err, results) => {
                    if (err) throw err;
                    console.table(results);
                    start();
                })
        });
}

function exit() {
    connection.end();
}