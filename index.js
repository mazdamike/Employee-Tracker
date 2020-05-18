var mysql = require("mysql");
var inquirer = require("inquirer");
var queries = require("./queries.js");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // port; if not 3306
  port: 3306,

  // username
  user: "root",

  // password
  password: "root",
  database: "employee_trackerdb"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("****************" + "\n" + "Employee Tracker" + "\n" + "****************");
  // run the startEmployeeTracker function after the connection is made to prompt the user
  start();
});

// start Employee Tracker function
var start = function() {
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View employees",
        "View departments",
        "View roles",
        "Add employees",
        "Add departments",
        "Add roles",
        "Update employee roles",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View employees":
        queries.viewEmployees();
        break;

      case "View departments":
        queries.viewDepartments();
        break;

      case "View roles":
        queries.viewRoles();
        break;

      case "Add employees":
        queries.addEmployees();
        break;

      case "Add departments":
        queries.addDepartments();
        break;

      case "Add roles":
        queries.addRoles();
        break;

      case "Update employee roles":
        queries.updateRoles();
        break;

      case "Exit":
        connection.end();
        break;
      }
    });
}

exports.connection = connection;
exports.start = start;