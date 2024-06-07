
require('dotenv').config();
const { Pool } = require('pg');


const pool = new Pool(
  {
    
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localHost',
    database: process.env.DB_NAME
  },
  console.log(`Connected to the employee_db database.`)
)

pool.connect();


module.exports = pool;