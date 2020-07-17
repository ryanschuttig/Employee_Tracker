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
                case "Update Employee Role":
                    updateEmployeeRole();
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
                    console.log(`Added ${answers.newDepartment}`);
                    start();
                })
        })
};

function addRole() {
    connection.query("SELECT name, id FROM department", (err, results) => {
        if (err) throw err;
        let departmentArray = [];
        for (i = 0; i < results.length; i++) {
            departmentArray.push({ "name": results[i].name, "id": results[i].id });
        }
        inquirer.prompt([
            {
                name: "newRoleIs",
                type: "input",
                message: "What role would you like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this role?"
            },
            {
                name: "departmentRoleIs",
                type: "rawlist",
                message: "Choose a Department for this role:",
                choices: departmentArray.map(department => department.name)
            },
        ])
            .then(answers => {
                const departmentId = departmentArray.filter(department => department.name === answers.departmentRoleIs);

                connection.query("INSERT INTO roles SET ?",
                    {
                        title: answers.newRoleIs,
                        salary: answers.salary,
                        department_id: answers.departmentId[0].id
                    },

                    (err, results) => {
                        if (err) throw err;
                        console.log(`${answer.newRoleIs} with a salary of $ ${answer.salary} has been added to the ${answer.departmentRoleIs}`);
                        start();
                    })
            })
    })
}

function addEmployee() {
    connection.query("", (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    })
};

function updateEmployeeRole() {
    connection.query("", (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    })
};

function exit() {
    connection.end();
}