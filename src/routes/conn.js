const express = require("express");
const app = express();
const mysql = require('mysql2');
const connection= require('./db');
var router = express.Router();

router.use(express.json());

//Display the records
router.get("/",(req,res) => {
    connection.query('SELECT * from employeetable', (err, rows) => {
        if(err) throw err;
        res.send(rows);
        connection.end();
    });
});

//insert the record
router.post('/adding_data', function (req, res) {
    var postData  = req.body;
    connection.query('INSERT INTO employeetable SET ?', postData, function (error, results, fields) {
       if (error) throw error;
       res.send(JSON.stringify(results));
       connection.end();
     });
 });

//delete records
 router.delete('/deleting_data/:id', function (req, res) {
    connection.query('DELETE FROM employeetable WHERE EmpID=?', [req.params.id], function (error, results, fields) {
       if (error) throw error;
       res.send('Record has been deleted!');
       connection.end();
     });
 });

//Update records
 router.put('/updating_data', function (req, res) {
    connection.query('UPDATE employeetable SET LastName=?, FirstName=?,Gender=?,Age=?,Contact=?,Email=? where EmpID=?', [req.body.LastName,req.body.FirstName, req.body.Gender, req.body.Age,req.body.Contact,req.body.Email,req.body.EmpID], function (error, results, fields) {
       if (error) throw error;
       res.send(JSON.stringify(results));
       connection.end();
     });
 });

module.exports=router;