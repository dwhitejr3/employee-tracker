const express = require('express');
const inquirer = require('inquirer');

const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
    {
      // TODO: Enter PostgreSQL username
      user: 'postgres',
      // TODO: Enter PostgreSQL password
      password: 'Bulldogs206!',
      host: 'localhost',
      database: 'movies_db'
    },
    console.log(`Connected to the employee_db database.`)
  )
  
  pool.connect();
  
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'options',
      message: 'What would tou like to do ?',
      choices: ['View all employees', 'Add employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department','Quit']  
    }
  ])