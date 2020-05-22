var index = require("./index.js");
var cTable = require("console.table");
var mysql = require("mysql");
var inquirer = require("inquirer");

// View employees function
var viewEmployees = function () {
    index.connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        index.start();
    });
}

// View departments function
var viewDepartments = function () {
    index.connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        index.start();
    });
}

// View roles function
var viewRoles = function () {
    index.connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        index.start();
    });
}


// Add employees function
var addEmployees = function () {

    // Query the database for all roles
    index.connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;

        // Get info for new employee to add
        inquirer
            .prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "What is the new employee's first name?"
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "What is the new employee's last name?"
                },
                {
                    name: "roleId",
                    type: "list",
                    message: "What is the new employee's role id?",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].id);
                        }
                        return choiceArray;
                    }
                }
            ])
            .then(function (answer) {
                // When finished prompting, insert a new employee into the db with that info
                index.connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: answer.roleId
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Employee added successfully!");
                        // Go back to start function
                        index.start();
                    }
                );
            });
    });
}

// Add departments function
var addDepartments = function () {
    inquirer
        .prompt([
            {
                name: "deptName",
                type: "input",
                message: "What is the name of the department to add?"
            }
        ])
        .then(function (answer) {
            index.connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.deptName
                },
                function (err) {
                    if (err) throw err;
                    console.log("Department added successfully!");
                    // Go back to start function
                    index.start();
                }
            );
        });
}


// Add roles function
var addRoles = function () {

    // Query the database for all departments
    index.connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;

        // Get info for new role to add
        inquirer
            .prompt([
                {
                    name: "roleName",
                    type: "input",
                    message: "What role would you like to add?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the salary for this role?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: "deptId",
                    type: "list",
                    message: "What is the new role's department id?",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].id);
                        }
                        return choiceArray;
                    }
                }
            ])
            .then(function (answer) {
                // When finished prompting, insert a new role into the db with that info
                index.connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.roleName,
                        salary: answer.salary,
                        department_id: answer.deptId
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Role added successfully!");
                        // Go back to start function
                        index.start();
                    }
                );
            });
    });
}

// Update roles function
var updateRoles = function () {
    // query the database for all roles
    index.connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        // once you have the roles, prompt the user for the person whose role is being updated and their new role id
        inquirer
            .prompt([
                {
                    name: "employeeId",
                    type: "input",
                    message: "What is the employees's id?",
                    // Make sure the employee exists in the database
                    validate: function (value) {
                    index.connection.query("SELECT * FROM employee", function (err, response) {
                        if (err) throw err;
                        for (var i = 0; i < response.length; i++) {
                           if (chosenEmployee === res[i].id) {
                             return true;
                           }
                           return false;
                        }
                       index.connection.end();  
                    });
                  }
                },
                {
                    name: "role",
                    type: "list",
                    choices: function () {
                        var roleArray = [];
                        for (var i = 0; i < res.length; i++) {
                            roleArray.push(res[i].id);
                        }
                        return roleArray;
                    },
                    message: "What is the id of the employee's new role?"
                }
            ])
            .then(function (answer) {
                // Update the employee table
                index.connection.query("UPDATE employee SET ? WHERE ?",
                    [
                        {
                            role_id: answer.role
                        },
                        {
                            id: answer.employeeId
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log("Employee's role updated successfully!");
                        index.start();
                    }
                );
            });
    });
};

var validateEmployee = function(chosenEmployee) {
    index.connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
           if (chosenEmployee === res[i].id) {
              return true;
           }
           return false;
        }


    });
}




module.exports = {
    viewEmployees: viewEmployees,
    viewDepartments: viewDepartments,
    viewRoles: viewRoles,
    addEmployees: addEmployees,
    addDepartments: addDepartments,
    addRoles: addRoles,
    updateRoles: updateRoles
};