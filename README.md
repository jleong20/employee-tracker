# Employee Tracker

## Description 

This application will allow the user to view, add, and update employee data.
The user will be prompt a menu in the beginning of the application with choices to
view employees, add employee & roles, and updates employee roles.

Sample code for menu:

```javascript
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
  ```

  For each choice in the menu, a function will run based on the user selection.
  The first function will allow the user to view a list of employees:

  ```javascript 
  function view(){
    connection.query("SELECT * FROM employee", function(err, results) {
        if (err) throw err;
        console.table(results);
    });
  ```

  The second function will allow the user to add employees:

  ```javascript 
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
  ```
  The final function will allow user to update roles on the chosen employee's first name:

  ```javascript 
  function update(){
    connection.query("SELECT * FROM employee", function(err, results) {
        inquirer.prompt({
            name:"empName",
            choices: function() {
                var empArray = [];
                for (var i = 0; i < results.length; i++) {
                    empArray.push(results[i].first_name);
                }
                return empArray;
            },
            message: "employee name: "
        },
        {
            name:"empRole",
            message: "what role: ",
            type: "input"
        }).then(function(res){
            connection.query("UPDATE employee SET ? WHERE ",
            [
                {
                  role_id = res.empRole
                },
                {
                  first_name = res.empName
                }
              ]),
            function(err) {
                if (err) throw err;
            }
        });
    })
}
  ```
The role_id in employee is joint to the id in the table role specified by this
MySQL code:

`SELECT first_name, last_name
FROM employee
INNER JOIN role ON employee.role_id = role.id;`

Also, the same for the role id to department_id:

`SELECT title, salary
FROM role
INNER JOIN department ON role.department_id = department.id;`

## Made With
* javaScript
* mySQL
* Node.js

## Credits

**Jerry Leong**
jerry.leong20@gmail.com

## License
MIT License

Copyright (c) 2020 Jerry Leong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.