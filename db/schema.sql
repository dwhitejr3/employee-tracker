DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR (30) 
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR (30),
    salary INTEGER,
    department_id INTEGER,
    CONSTRAINT fk_departments FOREIGN KEY (department_id) REFERENCES departments(id)
);


CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES employees (id),
    FOREIGN KEY (role_id) REFERENCES role (id)
);
    




    

