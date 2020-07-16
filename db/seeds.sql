USE employee_db;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Legal"), ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES
("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Accountant", 125000, 4),
("Legal Team Lead", 250000, 3),
("Lawyer", 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Albus", "Dumbledore", 1, 3),
("Harry", "Potter", 2, 2),
("Hermione", "Granger", 3, 1),
("Minerva", "McGonagall", 4, null),
("Ron", "Weasley", 5, null),
("Severus", "Snape", 6, null),
("Rubeus", "Hagrid", 7, null);