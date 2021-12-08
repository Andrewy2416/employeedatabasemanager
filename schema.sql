DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;


CREATE TABLE department (

id   int NOT NULL AUTO_INCREMENT,
name varchar(30) NOT NULL,

PRIMARY KEY (id)
);

CREATE TABLE role (

id            int NOT NULL AUTO_INCREMENT,
title         varchar(30) NOT NULL,
salary        decimal NOT NULL,
department_id int NOT NULL,

PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (

 id         int NOT NULL AUTO_INCREMENT,
 first_name varchar(30) NOT NULL,
 last_name  varchar(30) NOT NULL,
 manager_id int NULL,
 role_id    int NOT NULL,

PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role(id)
);
