-- drops db if already exists --
DROP DATABASE IF EXISTS employee_db;
-- create db --
CREATE DATABASE employee_db;

-- use db --
USE employee_db;

-- create department table --
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
);
-- create role table --
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT
);
-- create employee table --
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);

-- insert --
INSERT INTO  ()
VALUES ();

INSERT INTO  ()
VALUES ();

INSERT INTO  ()
VALUES ();

INSERT INTO  ()
VALUES ();

-- update --
UPDATE 
SET 
WHERE 

-- select --
SELECT * FROM people;




