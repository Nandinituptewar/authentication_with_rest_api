const jwt = require("jsonwebtoken");
const { sign } = require("jsonwebtoken");

const express = require("express");
const app = express();
const mysql = require('mysql2');
const connection= require('./db');
const router = express.Router();
const { checkToken } = require("../auth/token_validation");

router.use(express.json());

//Display the records
router.get("/",checkToken,(req,res) => {
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

 //login
 router.post('/login_data', function (req, res) {
    var postData  = req.body;
    console.log('1');
    connection.query('select * from userstable WHERE UserID= ?', [req.body.UserID] , function (error, results, fields) {
       if (error) {
           res.send(req.body.EmpID);
       }
       else{
           if(req.body.UserName==results[0]["UserName"]){
            results[0]["UserID"]= undefined; 
            const jsontoken= sign({result:results[0]},"abz134", {expiresIn: "1h"} ) ;
            return res.json({
                success: 1,
                message: "login successfully",
                token: jsontoken
              });
           }
           else{
               res.send('Invalid User Id or Name');
            }
       }
     });
 });

module.exports=router;