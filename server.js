const express = require('express');
const inquirer = require('inquirer');
const pool = require('./config/connection')



const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// this function is for the view all employees promt. its grabbing info from employees table
function getEmployees() {
  const sql = `SELECT * FROM employees;`
  pool.query(sql, (err, data) => {
    if (err) {
      console.error(err);
    }
    console.table(data.rows);

    questions();


  })
}
// this function is for the add employee prompt
function addEmployee() {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES($1,$2,$3,$4);`

// inquirer prompt is asking questions for the user to answer
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'What is the employees first name?'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'What is the employees last name?'
      },
      {
        type: 'list',
        name: 'role',
        message: 'What is the employees role ?',
        choices: ['Cashier', 'Deli associate', 'Bakery Associate', 'Manager']
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Who is the employees manager ?',
        choices: ['Lebron James', 'Tim Duncan']
      }

    ])
    .then((options) => {
      console.log(options.role)
      switch (options.role) {
        case 'Cashier':

          options.role = 1
          break;

        case 'Deli associate':

          options.role = 2
          break;

        case 'Bakery Associate':

          options.role = 3
          break;

        case 'Bakery Associate':

          options.role = 3
          break;

        case 'Manager':

          options.role = 4
          break;


      }
      switch (options.manager) {
        case 'Lebron James':
          options.manager = 1
          break;

        case 'Tim Duncan':
          options.manager = 2
          break;



      }
      // console.log(options.role);
      // console.log(options.manager);
      // This block is adding an employee to the database and console logging it based on what was entered in above
      const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES($1,$2,$3,$4);`
      const params = [options.firstName, options.lastName,
      options.role, options.manager];

      pool.query(sql, params, (err, data) => {
        if (err) {
          console.error(err);
        }
        console.log(`${options.firstName} has been added to the list of employees`)

        questions();


      })
    })
}

function getRoles() {
  const sql = `SELECT * FROM role;`
  pool.query(sql, (err, data) => {
    if (err) {
      console.error(err);
    }
    console.table(data.rows);

    questions();


  })
}

function addRole() {

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is title of the role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role? **NUMBERS ONLY**'
      },
      {
        type: 'list',
        name: 'department',
        message: 'Which department will this role be in ?',
        choices: ['Customer Service', 'Deli', 'Bakery', 'Management']
      }
      


    ])
    .then((options) => {
      switch (options.department) {
        case 'Customer Service':
          options.department = 1
          break;
          
          case 'Deli':
          options.department = 2
          break; 

          case 'Bakery':
          options.department = 3
          break; 

          case 'Management':
            options.department = 4
            break; 
      }

    const sql = `INSERT INTO role (title, salary, department_id) VALUES($1,$2,$3);`
    const params =[options.title, options.salary, options.department];
  pool.query(sql, params, (err, data) => {
    if (err) {
      console.error(err);
    }
    console.log(`${options.title} has been added to the list of roles`)

    questions();
  })
})}

function getDepartments() {
  const sql = `SELECT * FROM departments`
  pool.query(sql, (err, data) => {
    if (err) {
      console.error(err);
    }
    console.table(data.rows);

    questions();


  })
}

function addDepartment() {
  
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department?'
      },
    ])
    .then((options) => {
      const params = [options.department];
      const sql = `INSERT INTO departments (department_name) VALUES($1);`

      pool.query(sql ,params, (err, data) => {
        if (err) {
          console.error(err);
        }
        console.log(`${options.department} has been added to the list of departmnets`)

        questions();
      })
    })
}

function questions() {


  inquirer
    .prompt([
      {
        type: 'list',
        name: 'options',
        message: 'What would you like to do ?',
        choices: ['View all employees', 'Add employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
      }
    ])
    .then(({ options }) => {
      console.log(options);
      switch (options) {
        case 'View all employees':
          getEmployees();
          break;

        case 'Add employee':
          addEmployee();
          break;

        case 'Update Employee Role':

          break;

        case 'View All Roles':
          getRoles();
          break;

        case 'Add Role':
          addRole();

          break;

        case 'View All Departments':
          getDepartments();
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'Quit':
          process.exit();

        default:
      }
    })

}

questions();






