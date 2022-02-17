//Creating database connection 

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'nandu@123',
  database : 'employees_data'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});

module.exports= connection;