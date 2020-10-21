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
                add();
                break;
            case "Update employee":
                update();
                break;
        }
        
      });
  }
  function add(){}
  function view(){}
  function update(){}