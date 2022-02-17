//this is trial file

const express = require("express");
const app = express();
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

app.use(express.json());

app.get("/",(req,res) => {
    connection.query('SELECT * from employeetable', (err, rows) => {
        if(err) throw err;
        //console.log('The data from users table are: \n', rows);
        res.send(rows);
        connection.end();
    });
});

app.post('/adding_data', function (req, res) {
    var postData  = req.body;
    connection.query('INSERT INTO employeetable SET ?', postData, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

 app.delete('/deleting_data/:id', function (req, res) {
    connection.query('DELETE FROM employeetable WHERE EmpID=?', [req.params.id], function (error, results, fields) {
       if (error) throw error;
       res.end('Record has been deleted!');
     });
 });

 app.put('/updating_data', function (req, res) {
    connection.query('UPDATE employeetable SET LastName=?, FirstName=?,Gender=?,Age=?,Contact=?,Email=? where EmpID=?', [req.body.LastName,req.body.FirstName, req.body.Gender, req.body.Age,req.body.Contact,req.body.Email,req.body.EmpID], function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });


app.listen(3000, () => {
    console.log('Server is running at port 3000');
})