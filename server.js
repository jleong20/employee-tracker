const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password123",
    database: "employee_db"
});
connection.connect(function(err) {
    if (err) throw err;
    start();
});
function start() {
    inquirer
      .prompt({
        name: "menu",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all employees", 
            "Add employee",
            "Update employee",
        ]
      })
      .then(function(answer) {
        switch(answer.menu){
            case "View all employees":
                view();
                break;
            case "Add employee":
                addEmp();
                break;
            case "Update employee":
                update();
                break;
        }
      });
  }  
  function view(){
    connection.query("SELECT * FROM employee", function(err, results) {
        if (err) throw err;
        console.table(results);
    });
  }
  function addEmp(){
    connection.query("SELECT * FROM role", function(err, results) {
        inquirer.prompt({
            name:"firstName",
            message:"first name:",
            type: "input"
        },
        {
            name:"lastName",
            message:"last name:",
            type: "input"
        },
        {   
            name: "role",
            type: "list",
            choices: function() {
            var roleArray = [];
            for (var i = 0; i < results.length; i++) {
                roleArray.push(results[i].title);
            }
            return roleArray;
            },
            message: "What role?"},
        ).then(function(res){
            connection.query("INSERT INTO employee SET ?",
            {
                first_name = res.firstName,
                last_name = res.lastName,
                role_id = res.role
            },
            function(err){
                if (err) throw err;
            })
        });
    });
  }
  function update(){
    inquirer.prompt({
        
    }).then(function(res){});
  }