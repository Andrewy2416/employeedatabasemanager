INSERT INTO department (name)
VALUES
("Engineering"),
("Finance"),
("Legal"),
("Sales");

INSERT INTO role (title, salary, department_id)
VALUES
("Accountant", 60000, 2),
("Lawyer", 70000, 3),
("Mechanical Engineer", 110000, 1),
("Legal Team Lead", 120000, 3),
("Sales Lead", 85000, 4),
("Salesperson", 40000, 4),
("Software Engineer", 57500, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Kevin", "Sparrow", 3, null),
("Frank", "Potter", 1, null),
("Andrew", "Morel", 2, 4),
("Justin", "Rakoto", 4, null),
("Cyrus", "Duck", 6, 6),
("Dakota", "Simpson", 5, null),
("Chris", "Man", 7, 1);