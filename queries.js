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

}


// Update roles function
var updateRoles = function () {

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