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

// query the database for all roles
index.connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;

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
        name: "role",
        type: "list",
        message: "What is the new employee's role?",
        choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].title);
            }
            return choiceArray;
        }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      console.log("so good so far");
    }); 
    
}); 
}


// Add departments function
var addDepartments = function () {
    
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